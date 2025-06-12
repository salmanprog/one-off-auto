import _ from 'lodash';
import {baseUrl,storageUrl} from 'App/Helpers/Index'
import VehicleCategory from 'App/Controllers/Http/Resource/VehicleCategory';
import User from 'App/Controllers/Http/Resource/PublicUser';
import Media from 'App/Controllers/Http/Resource/Media';

class Vehicle
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
      status_text = 'Pending'
    }else if(record.status == '1'){
      status_text = 'Approved'
    }else{
      status_text = 'Expired'
    }
      return {
          id: record.id,
          vehicle_category_id: record.vehicle_category_id,
          vehicle_category: await VehicleCategory.initResponse(record.vehicleCategory,request),
          user_id: record.user_id,
          user: await User.initResponse(record.user,request),
          slug: record.slug,
          image_url: !_.isEmpty(record.media) ?  await storageUrl(record.media[0].file_url) : baseUrl('/images/dummy_car.jpg'),
          vehicle_make: record.vehicle_make,
          vehicle_model: record.vehicle_model,
          vehicle_year: record.vehicle_year,
          vehicle_mileage: record.vehicle_mileage,
          vehicle_price: record.vehicle_price,
          vehicle_title: record.vehicle_title,
          vehicle_descripition: record.vehicle_descripition,
          vehicle_modification: record.vehicle_modification,
          vehicle_owner_name: record.vehicle_owner_name,
          vehicle_owner_address: record.vehicle_owner_address,
          vehicle_owner_email: record.vehicle_owner_email,
          vehicle_owner_phone: record.vehicle_owner_phone,
          media: await Media.initResponse(record.media,request),
          status: status_text,
          created_at: formattedDate
      }
  }

}
module.exports = Vehicle;
