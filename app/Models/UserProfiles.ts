import { column,belongsTo,BelongsTo,hasManyThrough,HasManyThrough } from '@ioc:Adonis/Lucid/Orm'
import { strSlug, rand } from 'App/Helpers/Index'
import _ from 'lodash'
import { DateTime } from 'luxon'
import RestModel from './RestModel'
import Gender from 'App/Models/Gender'
import Sex from 'App/Models/Sex'
import SexOrientation from 'App/Models/SexOrientation'
import RelationShip from 'App/Models/RelationShip'
import AncillaryRealtionship from 'App/Models/AncillaryRealtionship'
import ContactUsStatus from 'App/Models/ContactUsStatus'
import AbuseStatuses from 'App/Models/AbuseStatuses'
import MartialStatus from 'App/Models/MartialStatus'

export default class UserProfiles extends RestModel
{
    public static table = 'user_profiles'

    @column({ isPrimary: true })
    public id: number

    @column()
    public user_id: number

    @column()
    public slug: string

    @column()
    public image_url: string

    @column()
    public name: string

    @column()
    public nick_name: string

    @column()
    public dob: string

    @column()
    public martial_status: number

    @column()
    public other_martial_status: string

    @column()
    public gender: number

    @column()
    public other_gender: string

    @column()
    public sex: number

    @column()
    public other_sex: string

    @column()
    public sex_orientation: number

    @column()
    public other_sex_orientation: string

    @column()
    public age: number

    @column()
    public relationship: number

    @column()
    public other_relationship: string

    @column()
    public ancillary_relationship: number

    @column()
    public abuse_status: number

    @column()
    public contact_status: number

    @column()
    public contact_status_updated_at: string

    @column()
    public status: number

    @column.dateTime({ autoCreate: true })
    public created_at: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updated_at: DateTime

    @column()
    public deleted_at: DateTime | null


    @belongsTo(() => Gender,{
        foreignKey:'gender'
    })
    public Gender: BelongsTo<typeof Gender>

    @belongsTo(() => Sex,{
        foreignKey:'sex'
    })
    public Sex: BelongsTo<typeof Sex>

    @belongsTo(() => SexOrientation,{
        foreignKey:'sex_orientation'
    })
    public SexOrientation: BelongsTo<typeof SexOrientation>

    @belongsTo(() => RelationShip,{
        foreignKey:'relationship'
    })
    public RelationShip: BelongsTo<typeof RelationShip>
    
    @belongsTo(() => AncillaryRealtionship,{
        foreignKey:'ancillary_relationship'
    })
    public AncillaryRealtionship: BelongsTo<typeof AncillaryRealtionship>

    @belongsTo(() => ContactUsStatus,{
        foreignKey:'contact_status'
    })
    public ContactUsStatus: BelongsTo<typeof ContactUsStatus>

    @belongsTo(() => AbuseStatuses,{
        foreignKey:'abuse_status'
    })
    public AbuseStatuses: BelongsTo<typeof AbuseStatuses>

    @belongsTo(() => MartialStatus,{
        foreignKey:'martial_status'
    })
    public MartialStatus: BelongsTo<typeof MartialStatus>

    
    public static fillable()
    {
        return [
          'slug','user_id','image_url','name','nick_name','dob','martial_status','other_martial_status','gender','other_gender','sex','other_sex','sex_orientation','other_sex_orientation','age','relationship','other_relationship','ancillary_relationship','abuse_status','contact_status','contact_status_updated_at','created_at','updated_at','deleted_at'
        ]
    }

    public static async getProfileById(id:number)
    {
        let record = await this.query().preload('Gender').preload('Sex').preload('SexOrientation').preload('RelationShip').preload('AncillaryRealtionship').preload('ContactUsStatus').where('id',id).whereNull('deleted_at').first();
        return record;
    }

    public static async getProfileCount(user_id:number)
    {
        let record = await this.query().where('user_id',user_id).whereNull('deleted_at').getCount();
        return record;
    }

    public static async getProfileBySlug(slug:string)
    {
        let record = await this.query().preload('Gender').preload('Sex').preload('SexOrientation').preload('RelationShip').preload('AncillaryRealtionship').preload('ContactUsStatus').where('slug',slug).whereNull('deleted_at').first();
        return record;
    }

    public static async generateSlug(name:string)
    {
        let slug = strSlug(name);
        let query = await this.query().where('slug',slug).count('id as total');
        return query[0].$extras.total == 0 ? slug : slug + query[0].$extras.total + rand(111,999);
    }
}
module.exports = UserProfiles;
