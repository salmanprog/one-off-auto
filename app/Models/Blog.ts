import { column,hasOne,HasOne,belongsTo,BelongsTo,hasMany,HasMany } from '@ioc:Adonis/Lucid/Orm'
import { strSlug, rand, currentDateTime } from 'App/Helpers/Index'
import _ from 'lodash'
import { DateTime } from 'luxon'
import RestModel from './RestModel'
import BlogCategory from './BlogCategory'
import moment from 'moment';

export default class Blog extends RestModel
{
    public static table = 'blogs'

    @column({ isPrimary: true })
    public id: number

    @column()
    public cat_id: number

    @column()
    public title: string

    @column()
    public slug: string

    @column()
    public description: string | null

    @column()
    public image_url: string | null
    
    @column()
    public meta_title: string | null
    
    @column()
    public meta_description: string | null

    @column.dateTime({ autoCreate: true })
    public created_at: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updated_at: DateTime

    @column()
    public deleted_at: DateTime | null

    @belongsTo(() => BlogCategory, {
        foreignKey: 'cat_id',
        localKey: 'id'
    })
    public BlogCategory: BelongsTo<typeof BlogCategory>

    public static fillable()
    {
        return [
          'title','slug','cat_id','description','image_url','meta_title','meta_description','created_at','updated_at','deleted_at'
        ]
    }
    
    public static async generateSlug(title: string)
    {
        let slug = strSlug(title);
        let query = await this.query().where('slug',slug).count('id as total');
        return query[0].$extras.total == 0 ? slug : slug + query[0].$extras.total + rand(111,999);
    }
    
}
module.exports = Blog;
