import RestController from '.././RestController'
import { schema,rules } from '@ioc:Adonis/Core/Validator'
import Blog from 'App/Models/Blog';
import _ from 'lodash'

export default class BlogController extends RestController
{
    protected __resource: string;
    protected __request: object;
    protected __response: object;
    protected __params: object;

    constructor() {
        super("Blog");
        this.__resource = "Blog";
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
          title: schema.string({},[
              rules.maxLength(150),
              rules.regex(/^[A-Za-z0-9\s]+$/)
            ]),

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
          title: schema.string({},[
              rules.maxLength(150),
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
        let body_params = this.__request.all();
        let check_blog_slug = await Blog.query().where('slug',this.__params.id).first();
        if(check_blog_slug?.slug != body_params.slug){
            let checking = await Blog.query().where('slug',body_params.slug).first();
              if(!_.isEmpty(checking)){
                this.__is_error = true;
                  return this.sendError(
                      'Validation Message',
                      { message: 'Slug already associated with another blog' },
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
        // let params = this.__request.all();
        // let user = this.__request.user();
        // let slug = this.__params.id

        // let get_user = await User.query().where('slug',slug).first();
        // let get_child = await User.getUserHierarchy(get_user.id)
        // let delete_all_childe = await User.query().whereIn('id',get_child).update({'deleted_at':currentDateTime()});
    }

    /**
     *
     */
    protected async afterDestoryLoadModel()
    {
       
    }
}
