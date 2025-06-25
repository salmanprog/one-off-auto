import RestController from './RestController'
import { schema,rules } from '@ioc:Adonis/Core/Validator'
import _ from 'lodash'
import I18n from '@ioc:Adonis/Addons/I18n'
import Chat from 'App/Models/Chat';

export default class ChatController extends RestController
{
    protected __resource: string;
    protected __request: any;
    protected __response: any;
    protected __params: any;

    constructor() {
        super("Chat");
        this.__resource = "Chat";
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
        let validator:any;
        let validationRules:any;

        validationRules = schema.create({
          reciever_id: schema.string({}),
            sender_id: schema.string({})
        })
        try{
          validator = await this.__validate({ schema: validationRules })
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
        let validator: any;
        let validationRules: any;

        validationRules = schema.create({
          reciever_id: schema.string({}),
          sender_id: schema.string({})
        })
        try{
          validator = await this.__validate({ schema: validationRules })
        } catch(error){
            this.__is_error = true;
            return this.sendError(
              I18n.locale(this.__request.language()).formatMessage('messages.validation_msg'),
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
    protected async afterIndexLoadModel(records:any)
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

    public async unreadMessages(ctx: HttpContextContract)
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
        //get user by email
        let user = this.__request.user();
        let unread_messages = await Chat.getTotalUnseenMessages(user.id);
        //send response
        this.__is_paginate = false;
        this.__collection = false;
        await this.__sendResponse(200,'',{'total_messages':parseInt(unread_messages)});
        return;
    }

    public async chatListing(ctx: HttpContextContract)
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
        //get user by email
        let user = this.__request.user();
        let records = await Chat.listingChat(user.id);
        //send response
        this.__is_paginate = false;
        await this.__sendResponse(200,'Chat history retrive successfully',records);
        return;
    }
}
