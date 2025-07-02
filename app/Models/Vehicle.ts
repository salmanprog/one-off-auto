import { column,hasOne,HasOne,belongsTo,BelongsTo,hasMany,HasMany } from '@ioc:Adonis/Lucid/Orm'
import { strSlug, rand, currentDateTime } from 'App/Helpers/Index'
import _ from 'lodash'
import { DateTime } from 'luxon'
import RestModel from './RestModel'
import User from './User'
import VehicleCategory from './VehicleCategory'
import VehicleDriverType from './VehicleDriverType'
import VehicleMotorSize from './VehicleMotorSize'
import VehicleTransmissionType from './VehicleTransmissionType'
import VehicleFuelType from './VehicleFuelType'
import VehicleSellerType from './VehicleSellerType'
import VehicleStatus from './VehicleStatus'
import VehicleSuspensionType from './VehicleSuspensionType'
import VehicleHpOutRange from './VehicleHpOutRange'
import VehicleUses from './VehicleUses'
import VehicleDocumentation from './VehicleDocumentation'
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
    public driver_type: number

    @column()
    public motor_size_cylinders: number

    @column()
    public transmition_types: number

    @column()
    public fuel_types: number

    @column()
    public number_of_doors: number

    @column()
    public exterior_color: string

    @column()
    public interior_color: string

    @column()
    public seller_type: number

    @column()
    public vehicle_status: number

    @column()
    public suspension_size: string

    @column()
    public suspension_type: number

    @column()
    public chassis_reinforcement: string

    @column()
    public chassis_reinforcement_text: string

    @column()
    public audio_upgrade: string

    @column()
    public audio_upgrade_text: string

    @column()
    public wheel_width: string

    @column()
    public wheel_diameter: string

    @column()
    public hp_output_rang: number

    @column()
    public cosmetic_upgrade: string

    @column()
    public cosmetic_upgrade_text: string

    @column()
    public vehicle_use: number

    @column()
    public interior_upgrade: string

    @column()
    public interior_upgrade_text: string

    @column()
    public exterior_upgrade: string

    @column()
    public exterior_upgrade_text: string

    @column()
    public motor_upgrade: string

    @column()
    public motor_upgrade_text: string

    @column()
    public documentation_type: number

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
    
    @belongsTo(() => VehicleDriverType, {
        foreignKey: 'driver_type',
        localKey: 'id'
    })
    public VehicleDriverType: BelongsTo<typeof VehicleDriverType>
    
    @belongsTo(() => VehicleMotorSize, {
        foreignKey: 'motor_size_cylinders',
        localKey: 'id'
    })
    public VehicleMotorSize: BelongsTo<typeof VehicleMotorSize>

    @belongsTo(() => VehicleTransmissionType, {
        foreignKey: 'transmition_types',
        localKey: 'id'
    })
    public VehicleTransmissionType: BelongsTo<typeof VehicleTransmissionType>

    @belongsTo(() => VehicleFuelType, {
        foreignKey: 'fuel_types',
        localKey: 'id'
    })
    public VehicleFuelType: BelongsTo<typeof VehicleFuelType>

    @belongsTo(() => VehicleSellerType, {
        foreignKey: 'seller_type',
        localKey: 'id'
    })
    public VehicleSellerType: BelongsTo<typeof VehicleSellerType>

    @belongsTo(() => VehicleStatus, {
        foreignKey: 'vehicle_status',
        localKey: 'id'
    })
    public VehicleStatus: BelongsTo<typeof VehicleStatus>

    @belongsTo(() => VehicleSuspensionType, {
        foreignKey: 'suspension_type',
        localKey: 'id'
    })
    public VehicleSuspensionType: BelongsTo<typeof VehicleSuspensionType>

    @belongsTo(() => VehicleHpOutRange, {
        foreignKey: 'hp_output_rang',
        localKey: 'id'
    })
    public VehicleHpOutRange: BelongsTo<typeof VehicleHpOutRange>

    @belongsTo(() => VehicleUses, {
        foreignKey: 'vehicle_use',
        localKey: 'id'
    })
    public VehicleUses: BelongsTo<typeof VehicleUses>

    @belongsTo(() => VehicleDocumentation, {
        foreignKey: 'documentation_type',
        localKey: 'id'
    })
    public VehicleDocumentation: BelongsTo<typeof VehicleDocumentation>

    public static fillable()
    {
        return [
          'vehicle_category_id','user_id','slug','vehicle_make','vehicle_model','vehicle_year','vehicle_mileage','vehicle_price','vehicle_primarily_used','vehicle_stock_parts','vehicle_title','vehicle_descripition','vehicle_modification','driver_type','motor_size_cylinders','transmition_types','fuel_types','number_of_doors','exterior_color','interior_color','seller_type','vehicle_status','suspension_size','suspension_type','chassis_reinforcement','chassis_reinforcement_text','audio_upgrade','audio_upgrade_text','wheel_width','wheel_diameter','hp_output_rang','cosmetic_upgrade','cosmetic_upgrade_text','vehicle_use','interior_upgrade','interior_upgrade_text','exterior_upgrade','exterior_upgrade_text','motor_upgrade','motor_upgrade_text','documentation_type','vehicle_owner_name','vehicle_owner_address','vehicle_owner_email','vehicle_owner_phone','status','created_at','updated_at','deleted_at'
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

    public static async getRelatedVehicleLists(slug:string,limit:number)
    {
        let show_limit = !_.isEmpty(limit) ? limit : 9;
        let record = await this.query().preload('vehicleCategory').preload('user').preload('media').whereIn('status',['1','2']).where('slug','<>',slug).orderBy('id','desc').limit(show_limit)
        return record;
    }

    public static async getVehicleBySlug(slug: string)
    {
        let record = await this.query().preload('vehicleCategory').preload('user').preload('media').where('slug',slug).first();
        return record;
    }
}
module.exports = Vehicle;
