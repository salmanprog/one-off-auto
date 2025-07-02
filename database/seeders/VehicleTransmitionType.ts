import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Database from '@ioc:Adonis/Lucid/Database'

export default class extends BaseSeeder {
  public async run () {
    await Database.table('vehicle_transmition_types').insert([
      {
        title: 'Automatic',
        slug: 'automatic',
        created_at: new Date(),
      },
      {
        title: 'Manual',
        slug: 'manual',
        created_at: new Date(),
      },
    ])
  }
}
