import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'vehicle_models'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('slug',100).notNullable().unique()
      table.string('title',100).notNullable()
      table.integer('make_id').unsigned().references('id').inTable('vehicle_makes').onDelete('CASCADE').onUpdate('NO ACTION');
      table.integer('year',11).notNullable()
      table.text('description').nullable()
      table.text('image_url').nullable()
      table.timestamp('created_at', { useTz: true }).nullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
      table.timestamp('deleted_at', { useTz: true }).nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
