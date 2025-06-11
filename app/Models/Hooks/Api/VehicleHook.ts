'use strict'

import _ from 'lodash';
import FileUpload from 'App/Libraries/FileUpload/FileUpload'
//import Hash from '@ioc:Adonis/Core/Hash'
import {currentDateTime } from 'App/Helpers/Index'
import Vehicle from 'App/Models/Vehicle';
import Database from '@ioc:Adonis/Lucid/Database';
import Media from 'App/Models/Media';

class VehicleHook
{
     /**
     * Hook for manipulate query of index result
     * @param {current mongo query} query
     * @param {adonis request object} request
     * @param {object} slug
     */
    public static async indexQueryHook(query: object, request: object, slug:string = '')
    {
        query.preload('vehicleCategory')
        query.preload('user')
        query.preload('media')
        query.where('status','1').orderBy('id','desc')
    }

    /**
     * Hook for manipulate data input before add data is execute
     * @param {adonis request object} request
     * @param {payload object} params
     */
    public static async beforeCreateHook(request: object, params:object)
    {
        if( !_.isEmpty(request.file('image_url')) ){
            params.image_url  = await FileUpload.doUpload(request.file('image_url'),'user');
            //params.blurimage  = await FileUpload.createBlurHash(params.image_url);
        }
        let slug      = await Vehicle.generateSlug(params.vehicle_title);
        params.slug       = slug
        params.user_id    = request.user().id
        params.status    = '1'
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
        let req = request.all();
        if( !_.isEmpty(request.files('vehicle_images')) ){
            let images = request.files('vehicle_images');
            let image_url  = '';
            for(let i = 0; i < images.length; i++){
                    image_url  = await FileUpload.doUpload(images[i],'vehicle');
                let slug = await Media.generateSlug('med_veh'+record.id+'_'+i);
                await Database.table('media').insert({
                                user_id: request.user().id,
                                slug: slug,
                                module: 'vehicle',
                                module_id: record.id,
                                filename: 'dumy_' + Math.floor((Math.random() * 100) + 1) + new Date().getTime(),
                                original_name: 'dumy_' + Math.floor((Math.random() * 100) + 1) + new Date().getTime(),
                                file_url: image_url,
                                file_url_blur: '0000',
                                thumbnail_url: image_url,
                                mime_type: 'image/jpeg',
                                file_type: 'image',
                                driver: 'local',
                                media_type: 'public',
                                meta: '',
                                created_at: currentDateTime()
                            });

            }
        }
    }

    /**
     * Hook for manipulate data input before update data is execute
     * @param {adonis request object} request
     * @param {payload object} params
     * @param {string} slug
     */
    public static async beforeEditHook(request:object, params:object, slug:string)
    {
        let req = request.all();
        let get_vehicle = await Vehicle.query().where('slug', slug).first();
        if( !_.isEmpty(get_vehicle) ){
            if( !_.isEmpty(req.delete_vehicle_images) ){
                let delete_image_id = JSON.parse(req.delete_vehicle_images); 
                for(let i = 0; i < delete_image_id.length; i++){
                    await Database.from('media').where('id', delete_image_id[i]).delete();
                }
            }
            if( !_.isEmpty(req.vehicle_images) ){
                let image_id = JSON.parse(req.vehicle_images);
                for(let i = 0; i < image_id.length; i++){
                    await Database.from('media').where('id', image_id[i]).update({
                        module: 'vehicle',
                        module_id: get_vehicle.id,
                        created_at: currentDateTime()
                    });
                }
            }
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
module.exports = VehicleHook;
