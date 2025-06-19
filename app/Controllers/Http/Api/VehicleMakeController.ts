import Application  from '@ioc:Adonis/Core/Application'
import RestController from './RestController'
import { schema,rules } from '@ioc:Adonis/Core/Validator'
import _ from 'lodash'

export default class VehicleMakeController extends RestController
{
    protected __resource: string;
    protected __request: object;
    protected __response: object;
    protected __params: object;

    constructor() {
        super("VehicleMake");
        this.__resource = "VehicleMake";
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
            title: schema.string({},[
              rules.maxLength(80),
              rules.regex(/^[A-Za-z0-9\s]+$/)
            ]),
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
        //check image validation
        if( !_.isEmpty(this.__request.file('image_url')) ) {
            let fileValidate = fileValidation(this.__request.file('image_url'),6000000,);
            if ( fileValidate.error ) {
              this.__is_error = true;
                return this.sendError(
                    'Validation Message',
                    { message: fileValidate.message },
                    400
                );
            }
        }
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
}
