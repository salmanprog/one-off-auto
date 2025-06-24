'use strict'
import _ from 'lodash';
import PublicUser from './PublicUser';

class Chat
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
      return {
        id: record.id,
        user: await PublicUser.initResponse(record.Sender,request),
        reciever: await PublicUser.initResponse(record.Reciever,request),
        sender_id:record.sender_id,
        reciever_id:record.reciever_id,
        slug: record.slug,
        group_id: record.group_id,
        message: record.message,
        delivered: record.delivered,
        file: record.file,
        seen: record.seen,
        type: record.type,
        created_at: record.created_at
      }
  }

}
module.exports = Chat;
