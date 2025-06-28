import _ from 'lodash';
import {baseUrl} from 'App/Helpers/Index'

class ApplicationSetting
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
        favicon: baseUrl() +'/uploads/'+ record.favicon,
        logo: baseUrl() +'/uploads/'+ record.logo,
        footer_logo: baseUrl() +'/uploads/'+ record.footer_logo,
        application_name: record.app_name,
        fb_link: record.fb_link,
        insta_link: record.insta_link,
        youtube_link: record.youtube_link,
        email: record.email,
        phone_number: record.phone_number,
        office_address: record.office_address,
      }
  }

}
module.exports = ApplicationSetting;
