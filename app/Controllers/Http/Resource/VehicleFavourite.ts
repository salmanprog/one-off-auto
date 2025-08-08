import _ from 'lodash';
import {baseUrl,storageUrl} from 'App/Helpers/Index'
import VehicleRes from 'App/Controllers/Http/Resource/Vehicle';

class VehicleFavourite
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
          image_url: !_.isEmpty(record.Vehicle.media) ?  await storageUrl(record.Vehicle.media[0].file_url) : baseUrl('/images/dummy_car.jpg'),
          vehicle: await VehicleRes.initResponse(record.Vehicle,request),
      }
  }

}
module.exports = VehicleFavourite;
