import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Database from '@ioc:Adonis/Lucid/Database'

export default class extends BaseSeeder {
  public async run () {
    await Database.table('vehicle_categories').insert([
      {
        title: 'Car',
        slug: 'car',
        description: 'Car',
        created_at: new Date(),
      },
      {
        title: 'Truck',
        slug: 'truck',
        description: 'Truck',
        created_at: new Date(),
      },
      {
        title: 'SUV',
        slug: 'suv',
        description: 'SUV',
        created_at: new Date(),
      },
      {
        title: 'Bike',
        slug: 'bike',
        description: 'Bike',
        created_at: new Date(),
      },
    ])
  }
}
