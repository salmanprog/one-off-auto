'use strict'
import _ from 'lodash';
import {baseUrl,storageUrl} from 'App/Helpers/Index'
import PublicUser from './PublicUser';
import Chat from 'App/Models/Chat';


class ChatGroup
{
  protected static async initResponse(data: object,request:object)
  {
      if( _.isEmpty(data) )
        return [];

      let response;
      if( Array.isArray(data) ){
        response = []
        for(var i=0; i < data.length; i++)
        {
          response.push( await this.jsonSchema(data[i],request));
        }
      } else {
        response = await this.jsonSchema(data,request)
      }
      return response;
  }

  private static async jsonSchema(record: object,request:object)
  {
    let user_obj;
      
    if(request.user().id == record.sender_id){
      user_obj = await PublicUser.initResponse(record.Reciever,request)
    }else{
      user_obj = await PublicUser.initResponse(record.Sender,request)
    }
    let lastmessage =await Chat.getlastMessage(record.id)
    return {
        id: record.id,
        //sender: await PublicUser.initResponse(record.Sender,request),
        //reciever: await PublicVendor.initResponse(record.Reciever,request),
        user:user_obj,
        slug: record.slug,
        //reciever_seen: record.reciever_seen,
        //sender_seen: record.sender_seen,
        last_message:_.isEmpty(lastmessage) ? '' : lastmessage.message,
        message_type:_.isEmpty(lastmessage) ? '' : lastmessage.type,
        total_unread_messages: parseInt(await Chat.getCountUnseenMessages(record.id,request.user().id)),
        created_at: record.created_at
    }
  }

}
module.exports = ChatGroup;
