import { column,hasOne,HasOne,belongsTo,BelongsTo,hasMany,HasMany } from '@ioc:Adonis/Lucid/Orm'
import { strSlug, rand, currentDateTime } from 'App/Helpers/Index'
import _ from 'lodash'
import { DateTime } from 'luxon'
import RestModel from './RestModel'
import moment from 'moment';

export default class VehicleSuspensionType extends RestModel
{
    public static table = 'vehicle_suspension_types'

    @column({ isPrimary: true })
    public id: number

    @column()
    public title: string

    @column()
    public slug: string

    @column.dateTime({ autoCreate: true })
    public created_at: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updated_at: DateTime

    @column()
    public deleted_at: DateTime | null

    public static fillable()
    {
        return [
          'title','slug','created_at','updated_at','deleted_at'
        ]
    }
    
    public static async generateSlug(title: string)
    {
        let slug = strSlug(title);
        let query = await this.query().where('slug',slug).count('id as total');
        return query[0].$extras.total == 0 ? slug : slug + query[0].$extras.total + rand(111,999);
    }
    
}
module.exports = VehicleSuspensionType;
