import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'vehicles'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('vehicle_category_id').unsigned().references('id').inTable('vehicle_categories').onDelete('CASCADE').onUpdate('NO ACTION');
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').onUpdate('NO ACTION');
      table.string('slug',100).notNullable().unique()
      table.string('vehicle_make',255).notNullable()
      table.string('vehicle_model',255).notNullable()
      table.string('vehicle_year',255).notNullable()
      table.string('vehicle_mileage',255).notNullable()
      table.string('vehicle_price',255).notNullable()
      table.string('vehicle_title',255).notNullable()
      table.text('vehicle_descripition').notNullable()
      table.text('vehicle_modification').notNullable()
      table.string('vehicle_owner_name',255).notNullable()
      table.text('vehicle_owner_address').nullable()
      table.string('vehicle_owner_email',100).notNullable()
      table.string('vehicle_owner_phone',100).notNullable()
      table.enu('status',['0','1','2']).notNullable().defaultTo('0')
      table.timestamp('created_at', { useTz: true }).nullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
      table.timestamp('deleted_at', { useTz: true }).nullable()

      table.index('vehicle_title')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
