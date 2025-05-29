import RestController from '.././RestController'
import { schema,rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import I18n from '@ioc:Adonis/Addons/I18n'
import _ from 'lodash'
import UserProfiles from 'App/Models/UserProfiles';

export default class UsersProfileController extends RestController
{
    protected __resource: string;
    protected __request: object;
    protected __response: object;
    protected __params: object;

    constructor() {
        super("UserProfiles");
        this.__resource = "AdminUserProfiles";
        this.__request; //adonis request obj
        this.__response; //adonis response obj
        this.__params = {}; // this is used for get parameters from url
        this.__success_store_message = 'messages.success_store_message';
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
          category_type: schema.string({},[
          ]),
          title: schema.string({},[
            rules.minLength(2),
            rules.maxLength(255)
          ])
        })
        try{
          validator = await this.__request.validate({ schema: validationRules })
        } catch(error){
            this.__is_error = true;
            return this.sendError(
              'Validation Message', //validation_msg
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
}
