import Application  from '@ioc:Adonis/Core/Application'
import RestController from './RestController'
import { schema,rules } from '@ioc:Adonis/Core/Validator'
import Vehicle from 'App/Models/Vehicle';
import _ from 'lodash'

export default class VehicleController extends RestController
{
    protected __resource: string;
    protected __request: object;
    protected __response: object;
    protected __params: object;

    constructor() {
        super("Vehicle");
        this.__resource = "Vehicle";
        this.__request; //adonis request obj
        this.__response; //adonis response obj
        this.__params = {}; // this is used for get parameters from url
    }

    /**
     *
     * @param action
     * @param slug
     */
    protected async validation( action: string, slug: string )
    {
        switch (action) {
          case "store":
            await this.storeValidation();
          break;
          case "update":
            await this.updateValidation();
          break;
        }
    }

    /**
     *
     * @returns
     */
    private async storeValidation()
    {
        let validator;
        let validationRules;
        validationRules = schema.create({
            vehicle_make: schema.string(),
            vehicle_model: schema.string(),
            vehicle_year: schema.string(),
            vehicle_mileage: schema.string(),
            vehicle_price: schema.string(),
            vehicle_title: schema.string(),
            vehicle_descripition: schema.string(),  
            vehicle_modification: schema.string(),
            vehicle_owner_name: schema.string(),
            vehicle_owner_address: schema.string(),
            vehicle_owner_email: schema.string(),
            vehicle_owner_phone: schema.string(),
        })
        try{
          validator = await this.__request.validate({ schema: validationRules,messages: {
                      required: '{{ field }} is required to vehicle', 
          }
         })
        } catch(error){
            this.__is_error = true;
            return this.sendError(
              'Validation Message',
               this.setValidatorMessagesResponse(error.messages),
               400
            )
        }
        return validator;
    }


    /**
     *
     * @returns
     */
    private async updateValidation()
    {
        let validator;
        let validationRules
        validationRules = schema.create({
            title: schema.string.optional({},[
              rules.minLength(2),
              rules.maxLength(80),
              rules.regex(/^[A-Za-z0-9\s]+$/)
            ]),
        })
        try{
          validator = await this.__request.validate({ schema: validationRules })
        } catch(error){
            this.__is_error = true;
            return this.sendError(
              'Validation Message',
              this.setValidatorMessagesResponse(error.messages),
              400
            )
        }
        return validator;
    }

    /**
     *
     */
    protected async beforeIndexLoadModel()
    {

    }

    /**
     *
     */
    protected async afterIndexLoadModel(records:object)
    {

    }

    /**
     *
     */
    protected async beforeStoreLoadModel()
    {
       
    }

    /**
     *
     */
    protected async afterStoreLoadModel()
    {

    }

    /**
     *
     */
    protected async beforeShowLoadModel()
    {

    }

    /**
     *
     */
    protected async afterShowLoadModel(record: object)
    {

    }

    /**
     *
     */
    protected async beforeUpdateLoadModel()
    {

    }

    /**
     *
     */
    protected async afterUpdateLoadModel()
    {

    }

    /**
     *
     */
    protected async beforeDestoryLoadModel()
    {

    }

    /**
     *
     */
    protected async afterDestoryLoadModel()
    {

    }

    public async userVehicleListing(ctx: HttpContextContract)
    {
        this.__request  = ctx.request;
        this.__response = ctx.response;
        //check validation
        let validationRules = schema.create({
        })
        try{
          await this.__request.validate({ schema: validationRules })
        } catch(error){
            return this.sendError(
              'Validation Message',
              this.setValidatorMessagesResponse(error.messages),
              400
            )
        }
        let params = this.__request.all();
        //get user by email
        let record = await Vehicle.getVehicleLists(params.limit);
        //send response
        this.__is_paginate = false;
        await this.__sendResponse(200,'User vehicle retrive successfully',record);
        return;
    }

    public async viewUserVehicle(ctx: HttpContextContract)
    {
        this.__request  = ctx.request;
        this.__response = ctx.response;
        this.__params   = ctx.params;
        //check validation
        let validationRules = schema.create({
        })
        try{
          await this.__request.validate({ schema: validationRules })
        } catch(error){
            return this.sendError(
              'Validation Message',
              this.setValidatorMessagesResponse(error.messages),
              400
            )
        }
        let slug = this.__params.slug
        //get vehicle by slug
        let record = await Vehicle.getVehicleBySlug(slug);
        //send response
        this.__is_paginate = false;
        await this.__sendResponse(200,'User vehicle retrive successfully',record);
        return;
    }
}
