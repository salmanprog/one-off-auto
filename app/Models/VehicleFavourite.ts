import { column,hasOne,HasOne,belongsTo,BelongsTo,hasMany,HasMany } from '@ioc:Adonis/Lucid/Orm'
import { strSlug, rand, currentDateTime } from 'App/Helpers/Index'
import _ from 'lodash'
import { DateTime } from 'luxon'
import RestModel from './RestModel'
import moment from 'moment';
import Vehicle from './Vehicle'
import Media from './Media'

export default class VehicleFavourite extends RestModel
{
    public static table = 'faourite_vehicles'

    @column({ isPrimary: true })
    public id: number

    @column()
    public user_id: number

    @column()
    public vehicle_id: number

    @column()
    public is_favourite: string

    @column()
    public slug: string

    @column.dateTime({ autoCreate: true })
    public created_at: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updated_at: DateTime

    @column()
    public deleted_at: DateTime | null

    @belongsTo(() => Vehicle, {
        foreignKey: 'vehicle_id',
        localKey: 'id'
    })
    public Vehicle: BelongsTo<typeof Vehicle>

    @hasMany(() => Media, {
            foreignKey: 'module_id',
            localKey: 'id'
        })
        public media: HasMany<typeof Media>

    public static fillable()
    {
        return [
          'user_id','slug','vehicle_id','is_favourite','created_at','updated_at','deleted_at'
        ]
    }
    
    public static async generateSlug(title: string)
    {
        let slug = strSlug(title);
        let query = await this.query().where('slug',slug).count('id as total');
        return query[0].$extras.total == 0 ? slug : slug + query[0].$extras.total + rand(111,999);
    }
    
}
module.exports = VehicleFavourite;
