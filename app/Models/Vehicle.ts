import { column,hasOne,HasOne,belongsTo,BelongsTo,hasMany,HasMany } from '@ioc:Adonis/Lucid/Orm'
import { strSlug, rand, currentDateTime } from 'App/Helpers/Index'
import _ from 'lodash'
import { DateTime } from 'luxon'
import RestModel from './RestModel'
import User from './User'
import VehicleCategory from './VehicleCategory'
import Media from './Media'
import moment from 'moment';

export default class Vehicle extends RestModel
{
    public static table = 'vehicles'

    @column({ isPrimary: true })
    public id: number

    @column()
    public vehicle_category_id: number

    @column()
    public user_id: number

    @column()
    public slug: string

    @column()
    public vehicle_make: string

    @column()
    public vehicle_model: string

    @column()
    public vehicle_year: string

    @column()
    public vehicle_mileage: string

    @column()
    public vehicle_price: string

    @column()
    public vehicle_primarily_used: string

    @column()
    public vehicle_stock_parts: string

    @column()
    public vehicle_title: string

    @column()
    public vehicle_descripition: string

    @column()
    public vehicle_modification: string

    @column()
    public vehicle_owner_name: string

    @column()
    public vehicle_owner_address: string

    @column()
    public vehicle_owner_email: string

    @column()
    public vehicle_owner_phone: string

    @column()
    public status: number

    @column.dateTime({ autoCreate: true })
    public created_at: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updated_at: DateTime

    @column()
    public deleted_at: DateTime | null

    @belongsTo(() => User, {
        foreignKey: 'user_id',
        localKey: 'id'
    })
    public user: BelongsTo<typeof User>

    @belongsTo(() => VehicleCategory, {
        foreignKey: 'vehicle_category_id',
        localKey: 'id'
    })
    public vehicleCategory: BelongsTo<typeof VehicleCategory>

    @hasMany(() => Media, {
        foreignKey: 'module_id',
        localKey: 'id'
    })
    public media: HasMany<typeof Media>
    
    public static fillable()
    {
        return [
          'vehicle_category_id','user_id','slug','vehicle_make','vehicle_model','vehicle_year','vehicle_mileage','vehicle_price','vehicle_primarily_used','vehicle_stock_parts','vehicle_title','vehicle_descripition','vehicle_modification','vehicle_owner_name','vehicle_owner_address','vehicle_owner_email','vehicle_owner_phone','status','created_at','updated_at','deleted_at'
        ]
    }

    public static async generateSlug(title: string)
    {
        let slug = strSlug(title);
        let query = await this.query().where('slug',slug).count('id as total');
        return query[0].$extras.total == 0 ? slug : slug + query[0].$extras.total + rand(111,999);
    }

    public static async getVehicleLists(limit:number)
    {
        let show_limit = !_.isEmpty(limit) ? limit : 3;
        let record = await this.query().preload('vehicleCategory').preload('user').preload('media').whereIn('status',['1','2']).orderBy('id','desc').limit(show_limit)
        return record;
    }

    public static async getVehicleBySlug(slug: string)
    {
        let record = await this.query().preload('vehicleCategory').preload('user').preload('media').where('slug',slug).first();
        return record;
    }
}
module.exports = Vehicle;
