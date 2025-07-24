import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'vehicles'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('vehicle_category_id').unsigned().references('id').inTable('vehicle_categories').onDelete('CASCADE').onUpdate('NO ACTION');
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').onUpdate('NO ACTION');
      table.string('slug',100).notNullable().unique()
      table.integer('vehicle_make').unsigned().references('id').inTable('vehicle_makes').onDelete('CASCADE').onUpdate('NO ACTION');
      table.integer('vehicle_model').unsigned().references('id').inTable('vehicle_models').onDelete('CASCADE').onUpdate('NO ACTION');
      table.integer('vehicle_year').unsigned().references('id').inTable('vehicle_years').onDelete('CASCADE').onUpdate('NO ACTION');
      table.string('vehicle_mileage',255).notNullable()
      table.string('vehicle_price',255).notNullable()
      table.string('vehicle_primarily_used',255).notNullable()
      table.string('vehicle_stock_parts',255).notNullable().defaultTo('no')
      table.text('vehicle_stock_parts_text').nullable()
      table.string('vehicle_title',255).notNullable()
      table.text('vehicle_descripition').notNullable()
      table.text('vehicle_modification').notNullable()
      table.integer('driver_type').unsigned().references('id').inTable('vehicle_driver_types').onDelete('CASCADE').onUpdate('NO ACTION');
      table.integer('motor_size_cylinders').unsigned().references('id').inTable('vehicle_motor_size_cylinders').onDelete('CASCADE').onUpdate('NO ACTION');
      table.integer('transmition_types').unsigned().references('id').inTable('vehicle_transmition_types').onDelete('CASCADE').onUpdate('NO ACTION');
      table.integer('fuel_types').unsigned().references('id').inTable('vehicle_fuel_types').onDelete('CASCADE').onUpdate('NO ACTION');
      table.integer('number_of_doors',10).notNullable()
      table.string('exterior_color',255).notNullable()
      table.string('interior_color',255).notNullable()
      table.integer('seller_type').unsigned().references('id').inTable('vehicle_seller_types').onDelete('CASCADE').onUpdate('NO ACTION');
      table.integer('vehicle_status').unsigned().references('id').inTable('vehicle_statuses').onDelete('CASCADE').onUpdate('NO ACTION');
      table.string('suspension_size',255).notNullable()
      table.integer('suspension_type').unsigned().references('id').inTable('vehicle_suspension_types').onDelete('CASCADE').onUpdate('NO ACTION');
      table.enu('chassis_reinforcement',['0','1']).notNullable().defaultTo('0')
      table.text('chassis_reinforcement_text').nullable()
      table.enu('audio_upgrade',['0','1']).notNullable().defaultTo('0')
      table.text('audio_upgrade_text').nullable()
      table.string('wheel_width',255).notNullable()
      table.string('wheel_diameter',255).notNullable()
      table.integer('hp_output_rang').unsigned().references('id').inTable('vehicle_hp_output_rangs').onDelete('CASCADE').onUpdate('NO ACTION');
      table.enu('cosmetic_upgrade',['0','1']).notNullable().defaultTo('0')
      table.text('cosmetic_upgrade_text').nullable()
      table.integer('vehicle_use').unsigned().references('id').inTable('vehicle_uses').onDelete('CASCADE').onUpdate('NO ACTION');
      table.enu('interior_upgrade',['0','1']).notNullable().defaultTo('0')
      table.text('interior_upgrade_text').nullable()
      table.enu('exterior_upgrade',['0','1']).notNullable().defaultTo('0')
      table.text('exterior_upgrade_text').nullable()
      table.enu('motor_upgrade',['0','1']).notNullable().defaultTo('0')
      table.text('motor_upgrade_text').nullable()
      table.integer('documentation_type').unsigned().references('id').inTable('vehicle_documentation_types').onDelete('CASCADE').onUpdate('NO ACTION');
      table.string('vehicle_owner_name',255).notNullable()
      table.text('vehicle_owner_address').nullable()
      table.string('vehicle_owner_email',100).notNullable()
      table.string('vehicle_owner_phone',100).notNullable()
      table.string('street_number').nullable();
      table.string('route').nullable();
      table.string('locality').nullable();
      table.string('administrative_area_level_2').nullable();
      table.string('administrative_area_level_1').nullable();
      table.string('country').nullable();
      table.string('postal_code').nullable();
      table.string('formatted_address').nullable();
      table.string('latitude').nullable();
      table.string('longitude').nullable();
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
