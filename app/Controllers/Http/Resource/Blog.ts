import _ from 'lodash';
import {baseUrl,storageUrl} from 'App/Helpers/Index'
import BlogCategory from 'App/Controllers/Http/Resource/BlogCategory';

class Blog
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
          cat_id: record.cat_id,
          title: record.title,
          slug: record.slug,
          description: record.description,
          image_url: !_.isEmpty(record.image_url) ?  await storageUrl(record.image_url) : baseUrl('/images/user-placeholder.jpg'),
          meta_title: record.meta_title,
          meta_description: record.meta_description,
          schedule_date: record.schedule_date,
          category: await BlogCategory.initResponse(record.BlogCategory,request),
          created_at: record.created_at
      }
  }

}
module.exports = Blog;
