'use strict'

import _ from 'lodash';
import FileUpload from 'App/Libraries/FileUpload/FileUpload'
//import Hash from '@ioc:Adonis/Core/Hash'
import {currentDateTime,rand } from 'App/Helpers/Index'
import VehicleFavourite from 'App/Models/VehicleFavourite';

class VehicleFavouriteHook
{
     /**
     * Hook for manipulate query of index result
     * @param {current mongo query} query
     * @param {adonis request object} request
     * @param {object} slug
     */
    public static async indexQueryHook(query: object, request: object, slug:string = '')
    {
        query.preload('Vehicle').where('user_id',request.user().id).where('is_favourite','1').orderBy('id','desc')
    }

    /**
     * Hook for manipulate data input before add data is execute
     * @param {adonis request object} request
     * @param {payload object} params
     */
    public static async beforeCreateHook(request: object, params:object)
    {
        let delete_previouse =  await VehicleFavourite.query().where('user_id',params.user_id).where('vehicle_id',params.vehicle_id).delete();
        if( !_.isEmpty(request.file('image_url')) ){
            params.image_url  = await FileUpload.doUpload(request.file('image_url'),'user');
            //params.blurimage  = await FileUpload.createBlurHash(params.image_url);
        }
        let slug      = await VehicleFavourite.generateSlug('fav_'+rand(111,999));
        params.slug       = slug
        params.created_at = currentDateTime();

    }

    /**
     * Hook for execute command after add public static function called
     * @param {saved record object} record
     * @param {adonis request object} request
     * @param {payload object} params
     */
    public static async afterCreateHook(record:object, request:object, params:object)
    {
       
    }

    /**
     * Hook for manipulate data input before update data is execute
     * @param {adonis request object} request
     * @param {payload object} params
     * @param {string} slug
     */
    public static async beforeEditHook(request:object, params:object, slug:string)
    {
        if( !_.isEmpty(request.file('image_url')) ){
          params.image_url  = await FileUpload.doUpload(request.file('image_url'),'user');
          //params.blurimage  = await FileUpload.createBlurHash(params.image_url);
        }

    }

    /**
     * Hook for execute command after edit
     * @param {updated record object} record
     * @param {adonis request object} request
     * @param {payload object} params
     */
    public static async afterEditHook(request:object, slug:string)
    {
        
    }

    /**
     * Hook for execute command before delete
     * @param {adonis request object} request
     * @param {payload object} params
     * @param {string} slug
     */
    public static async beforeDeleteHook(request:object, params:object, slug:string)
    {

    }

    /**
     * Hook for execute command after delete
     * @param {adonis request object} request
     * @param {payload object} params
     * @param {string} slug
     */
    public static async afterDeleteHook(request:object, params:object, slug:string)
    {

    }
}
module.exports = VehicleFavouriteHook;
