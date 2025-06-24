import Ws from 'App/Services/Ws';
import SocketAuthorization from 'App/Middleware/SocketAuthorization';
import _ from 'lodash';
import Controller from 'App/Controllers/Http/Controller';
import Env from '@ioc:Adonis/Core/Env'
import User from 'App/Models/User';
import { validator, schema, rules } from '@ioc:Adonis/Core/Validator';
import ChatGroup from 'App/Models/ChatGroup';
import Chat from 'App/Models/Chat';
import { currentDateTime } from 'App/Helpers/Index'
import Notification from 'App/Models/Notification';

const baseController = new Controller();
Ws.boot()


Ws.io.use(async (socket: any, next) => {
  //join socket
  let auth = await SocketAuthorization.handle(socket.handshake.query.Authorization);
  if (_.isEmpty(auth)) {
    return await next(new Error("unauthorized error"));
  }
  socket.join('sck_'+auth.id);
  socket.auth = auth.toJSON();
  next();
}).on('connection', (socket: any) => {
  let user = socket.auth;
  let slug = user.slug;
  baseController.__socket = socket;
  //Join Socket

  socket.on('_join_room', async (params, callback) => {

    let validationRules = schema.create({
      user_id: schema.string()
    })
    let validatorFails = await baseController.validateSocketParams(params, validationRules, callback, '_on_join_room')
    if (validatorFails){
      let err_response = baseController.sendSocketError(400, "Validation Error", validatorFails);
      
      socket.emit('_on_join_room', err_response)
      //callback(err_response);
    }else{
      User.updateUser({ is_socket: '1' }, { id:user.id });
      user = await User.getUserByEmail(user.email)
      // user.online_status = '1';
      baseController.__is_paginate = false;
      baseController.__resource = 'PublicUser';
      let response = await baseController.sendScktResponse(200, 'User join socket successfully', user);
      socket.emit('_on_join_room', response)
      //callback(response)
    }
  
  });

  socket.on('_send_message', async (params, callback) => {
    let validationRules = schema.create({
      reciever_id: schema.number(),
      sender_id: schema.number(),
      message: schema.string(),
      type: schema.enum(['file', 'text', 'image', 'video'])
    })
    let validatorFails = await baseController.validateSocketParams(params, validationRules, callback, '_recieve_message')
    if (validatorFails){
      let err_response = baseController.sendSocketError(400, "Validation Error", validatorFails);
      socket.emit('_recieve_message', err_response)
      callback(err_response);
    }else{
        let getGroup = await ChatGroup.checkChat(params.sender_id,params.reciever_id)
        let seen_chat = '0'
        if(params.sender_id == getGroup.reciever_id){
          seen_chat = getGroup.sender_is_online
        }else{
          seen_chat = getGroup.reciever_is_online
        }
        params.group_id = getGroup.id,
        params.seen = seen_chat
        let data = await Chat.createChat(params);
        baseController.__is_paginate = false;
        baseController.__resource = 'Chat';
        let response = await baseController.sendScktResponse(200, 'Message send successfully', data);
        let total_unread_messages = await Chat.getCountUnseenMessages(params.group_id,params.reciever_id);
        let updateGroup = await ChatGroup.updateGroup({ reciever_seen: '1', 'total_unread_messages': total_unread_messages,'updated_at':currentDateTime() },{'id':getGroup.id})
        socket.to('sck_'+params.reciever_id).emit('_recieve_message', response)
        socket.emit('_recieve_message', response)
        callback(response)
  }
  });

  socket.on('_load_recent_chat', async (params, callback) => {
    
    let validationRules = schema.create({
      reciever_id: schema.number(),
      sender_id: schema.number(),
    })
    let validatorFails = await baseController.validateSocketParams(params, validationRules, callback, '_recent_chat')
    if (validatorFails){
      let err_response = baseController.sendSocketError(400, "Validation Error", validatorFails);
      socket.emit('_recent_chat', err_response)
      //callback(err_response);
    }else{
      let getGroup = await ChatGroup.checkChat(params.sender_id,params.reciever_id)
      baseController.__is_paginate = false;
      baseController.__resource = 'Chat';
      let response;
        if(_.isEmpty(getGroup)){
          response = await baseController.sendScktResponse(200, 'Retrive Recent Chat', []);
        }else{
          let data = await Chat.getRecentChat(getGroup.id);
          let updateChat = await Chat.updateChat({ seen: '0'},{'reciever_id':params.sender_id,'sender_id':params.reciever_id,'group_id':getGroup.id})
          let total_unread_messages = await Chat.getCountUnseenMessages(getGroup.id,params.reciever_id);
          let updateGroup = await ChatGroup.updateGroup({ reciever_seen: '0', 'total_unread_messages': total_unread_messages },{'id':getGroup.id})
          response = await baseController.sendScktResponse(200, 'Retrive Recent Chat', data);
        }
        socket.emit('_recent_chat', response)
        //callback(response)
    }
  })
    
  socket.on('_get_chat_room_id', async (params, callback) => {
    // check if user is online
    let validationRules = schema.create({
      reciever_id: schema.number(),
      sender_id: schema.number(),
    })
    let validatorFails = await baseController.validateSocketParams(params, validationRules, callback, '_chat_room_id')
    if (validatorFails){
      let err_response = baseController.sendSocketError(400, "Validation Error", validatorFails);
      socket.emit('_chat_room_id', err_response)
      callback(err_response);
    }else{
      let getGroup = await ChatGroup.getGroupId(params.sender_id,params.reciever_id)
      baseController.__collection = false;
      let result = {};
      if(!_.isEmpty(getGroup)){
        result = {group_id:getGroup.id};
        let response = await baseController.sendScktResponse(200, 'Retrive Chat Room Id', result);
        socket.emit('_chat_room_id', result)
        callback(response)
      }else{
        result = {group_id:0};
        let response = await baseController.sendScktResponse(200, 'Retrive Chat Room Id', result);
        socket.emit('_chat_room_id', result)
        callback(response)
      }
    }
  })

  socket.on('_user_chat_room_in', async (params, callback) => {
    // check if user is online
    let validationRules = schema.create({
      reciever_id: schema.number(),
      sender_id: schema.number(),
      is_online: schema.enum(['0', '1'])
    })
    let validatorFails = await baseController.validateSocketParams(params, validationRules, callback, '_user_chat_room')
    if (validatorFails){
      let err_response = baseController.sendSocketError(400, "Validation Error", validatorFails);
      socket.emit('_user_chat_room', err_response)
      callback(err_response);
    }else{
      let updateOnlineStatus = await ChatGroup.updateOnlineStatus(params.sender_id,params.reciever_id,params.is_online)
      let response = await baseController.sendScktResponse(200, 'User Chat Room In', updateOnlineStatus);
      socket.emit('_user_chat_room', response)
      callback(response)
    }
  })

  socket.on('_user_chat_read_unread_messages', async (params, callback) => {
    // check if user is online
    let validationRules = schema.create({
      reciever_id: schema.number(),
      sender_id: schema.number(), 
    })
    let validatorFails = await baseController.validateSocketParams(params, validationRules, callback, '_read_unread_messages')
    
    if (validatorFails){
      let err_response = baseController.sendSocketError(400, "Validation Error", validatorFails);
      socket.emit('_read_unread_messages', err_response)
      callback(err_response);
    }else{
      let get_read_unread_messages = await Chat.getTotalUnseenMessages(params.reciever_id)
      let response = {
        "code": 200,
        "message": "",
        "data": {
            "total_messages": parseInt(get_read_unread_messages),
            "user_id": params.reciever_id 
        }
      }
      socket.to('sck_'+params.reciever_id).emit('_read_unread_messages', response)
      socket.emit('_read_unread_messages', response)
      callback(response)
    }
  })

  socket.on('_sender_read_messages', async (params, callback) => {
    // check if user is online
    let validationRules = schema.create({
      reciever_id: schema.number(),
    })
    let validatorFails = await baseController.validateSocketParams(params, validationRules, callback, '_read_messages')
    
    if (validatorFails){
      let err_response = baseController.sendSocketError(400, "Validation Error", validatorFails);
      socket.emit('_read_messages', err_response)
      callback(err_response);
    }else{
      let get_read_unread_messages = await Chat.getTotalUnseenMessages(params.reciever_id)
      let response = {
        "code": 200,
        "message": "",
        "data": {
            "total_messages": parseInt(get_read_unread_messages),
            "user_id": params.reciever_id 
        }
      }
      socket.emit('_read_messages', response)
      callback(response)
    }
  })

})