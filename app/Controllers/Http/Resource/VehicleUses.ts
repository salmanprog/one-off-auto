import _ from 'lodash';
import {baseUrl,storageUrl} from 'App/Helpers/Index'

class VehicleUses
{

  public static async initResponse(data: object,request:object)
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
          title: record.title,
          slug: record.slug,
          created_at: record.created_at
      }
  }

}
module.exports = VehicleUses;
