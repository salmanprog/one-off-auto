import _ from 'lodash';
import {baseUrl,storageUrl} from 'App/Helpers/Index'
import VehicleCategory from 'App/Controllers/Http/Resource/VehicleCategory';
import User from 'App/Controllers/Http/Resource/PublicUser';
import Media from 'App/Controllers/Http/Resource/Media';
import VehicleDriverTypeRes from 'App/Controllers/Http/Resource/VehicleDriverType';
import VehicleMotorSizeRes from 'App/Controllers/Http/Resource/VehicleMotorSize';
import VehicleTransmissionTypeRes from 'App/Controllers/Http/Resource/VehicleTransmissionType';
import VehicleFuelTypeRes from 'App/Controllers/Http/Resource/VehicleFuelType';
import VehicleSellerTypeRes from 'App/Controllers/Http/Resource/VehicleSellerType';
import VehicleStatusRes from 'App/Controllers/Http/Resource/VehicleStatus';
import VehicleSuspensionTypeRes from 'App/Controllers/Http/Resource/VehicleSuspensionType';
import VehicleHpOutRangeRes from 'App/Controllers/Http/Resource/VehicleHpOutRange';
import VehicleUsesRes from 'App/Controllers/Http/Resource/VehicleUses';
import VehicleDocumentationRes from 'App/Controllers/Http/Resource/VehicleDocumentation';
import VehicleMakeRes from 'App/Controllers/Http/Resource/VehicleMake';
import VehicleModelRes from 'App/Controllers/Http/Resource/VehicleModel';
import VehicleYearRes from 'App/Controllers/Http/Resource/VehicleYear';
import VehicleFavourite from 'App/Models/VehicleFavourite';

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
    const params = request.all();
    let is_favourite = 0;
    let status_text = ''
    if(record.status == '0'){
      status_text = 'Pending'
    }else if(record.status == '1'){
      status_text = 'Approved'
    }else if(record.status == '3'){
      status_text = 'Disapproved'
    }else{
      status_text = 'Sold'
    }
    if(!_.isEmpty(params.user_id) && params.user_id > 0){
        let get_favourite = await VehicleFavourite.query().where('user_id',params.user_id).where('vehicle_id',record.id).first();
        if(!_.isEmpty(get_favourite)){
          is_favourite = parseInt(get_favourite?.is_favourite)
        }
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
          vehicle_make_obj: await VehicleMakeRes.initResponse(record.VehicleMake,request),
          vehicle_model: record.vehicle_model,
          vehicle_model_obj: await VehicleModelRes.initResponse(record.VehicleModel,request),
          vehicle_year: record.vehicle_year,
          vehicle_year_obj: await VehicleYearRes.initResponse(record.VehicleYear,request),
          vehicle_mileage: record.vehicle_mileage,
          vehicle_price: record.vehicle_price,
          vehicle_primarily_used: record.vehicle_primarily_used,
          vehicle_stock_parts: record.vehicle_stock_parts,
          vehicle_stock_parts_text: record.vehicle_stock_parts_text,
          vehicle_title: record.vehicle_title,
          vehicle_descripition: record.vehicle_descripition,
          vehicle_modification: record.vehicle_modification,
          driver_type: record.driver_type,
          driver_type_obj: await VehicleDriverTypeRes.initResponse(record.VehicleDriverType,request),
          motor_size_cylinders: record.motor_size_cylinders,
          motor_size_cylinders_obj: await VehicleMotorSizeRes.initResponse(record.VehicleMotorSize,request),
          transmition_types: record.transmition_types,
          transmition_types_obj: await VehicleTransmissionTypeRes.initResponse(record.VehicleTransmissionType,request),
          fuel_types: record.fuel_types,
          fuel_types_obj: await VehicleFuelTypeRes.initResponse(record.VehicleFuelType,request),
          number_of_doors: record.number_of_doors,
          exterior_color: record.exterior_color,
          interior_color: record.interior_color,
          seller_type: record.seller_type,
          seller_type_obj: await VehicleSellerTypeRes.initResponse(record.VehicleSellerType,request),
          vehicle_status: record.vehicle_status,
          vehicle_status_obj: await VehicleStatusRes.initResponse(record.VehicleStatus,request),
          suspension_size: record.suspension_size,
          suspension_type: record.suspension_type,
          suspension_type_obj: await VehicleSuspensionTypeRes.initResponse(record.VehicleSuspensionType,request),
          chassis_reinforcement: record.chassis_reinforcement,
          chassis_reinforcement_text: record.chassis_reinforcement_text,
          audio_upgrade: record.audio_upgrade,
          audio_upgrade_text: record.audio_upgrade_text,
          wheel_width: record.wheel_width,
          wheel_diameter: record.wheel_diameter,
          hp_output_rang: record.hp_output_rang,
          hp_output_rang_obj: await VehicleHpOutRangeRes.initResponse(record.VehicleHpOutRange,request),
          cosmetic_upgrade: record.cosmetic_upgrade,
          cosmetic_upgrade_text: record.cosmetic_upgrade_text,
          vehicle_use: record.vehicle_use,
          vehicle_use_obj: await VehicleUsesRes.initResponse(record.VehicleUses,request),
          interior_upgrade: record.interior_upgrade,
          interior_upgrade_text: record.interior_upgrade_text,
          exterior_upgrade: record.exterior_upgrade,
          exterior_upgrade_text: record.exterior_upgrade_text,
          motor_upgrade: record.motor_upgrade,
          motor_upgrade_text: record.motor_upgrade_text,
          documentation_type: record.documentation_type,
          documentation_type_obj: await VehicleDocumentationRes.initResponse(record.VehicleDocumentation,request),
          vehicle_owner_name: record.vehicle_owner_name,
          vehicle_owner_address: record.vehicle_owner_address,
          vehicle_owner_email: record.vehicle_owner_email,
          vehicle_owner_phone: record.vehicle_owner_phone,
          country: record.country,
          postal_code: record.postal_code,
          formatted_address: record.formatted_address,
          latitude: record.latitude,
          longitude: record.longitude,
          is_favourite:is_favourite,
          media: await Media.initResponse(record.media,request),
          status_text: status_text,
          status: record.status,
          created_at: formattedDate
      }
  }

}
module.exports = Vehicle;
