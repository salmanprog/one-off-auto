import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Database from '@ioc:Adonis/Lucid/Database'

export default class extends BaseSeeder {
  public async run () {
    await Database.table('vehicle_seller_types').insert([
      {
        title: 'Dealer',
        slug: 'dealer',
        created_at: new Date(),
      },
      {
        title: 'Private Party',
        slug: 'private',
        created_at: new Date(),
      },
    ])
  }
}
