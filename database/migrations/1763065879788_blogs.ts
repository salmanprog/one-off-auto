import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'blogs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('slug',100).notNullable().unique()
      table.integer('cat_id').unsigned().references('id').inTable('blog_categories').onDelete('CASCADE').onUpdate('NO ACTION');
      table.string('title',255).nullable()
      table.text('description').nullable()
      table.text('image_url').nullable()
      table.string('meta_title',255).nullable()
      table.text('meta_description').nullable()
      table.timestamp('created_at', { useTz: true }).nullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
      table.timestamp('deleted_at', { useTz: true }).nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
