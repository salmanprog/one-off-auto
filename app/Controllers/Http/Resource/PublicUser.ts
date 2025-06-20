import _ from 'lodash';
import {baseUrl,storageUrl} from 'App/Helpers/Index'

class PublicUser
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
    const createdAt = record.created_at;
    const formattedDate = createdAt ? new Date(createdAt).toISOString().split("T")[0] : '';
    let status_text = ''
    if(record.status == '0'){
      status_text = 'De-Active'
    }else if(record.status == '1'){
      status_text = 'Active'
    }
      return {
          id: record.id,
          name: record.name,
          slug: record.slug,
          email: record.email,
          mobile_no: record.mobile_number,
          image_url: !_.isEmpty(record.image_url) ?  await storageUrl(record.image_url) : baseUrl('/images/user-placeholder.jpg'),
          status: status_text,
          created_at: formattedDate
      }
  }

}
module.exports = PublicUser;
