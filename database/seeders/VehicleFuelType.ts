import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Database from '@ioc:Adonis/Lucid/Database'

export default class extends BaseSeeder {
  public async run () {
    await Database.table('vehicle_fuel_types').insert([
      {
        title: 'Gasoline',
        slug: 'gasoline',
        created_at: new Date(),
      },
      {
        title: 'Diesel',
        slug: 'diesel',
        created_at: new Date(),
      },
      {
        title: 'Hybrid',
        slug: 'hybrid',
        created_at: new Date(),
      },
      {
        title: 'Electric',
        slug: 'electric',
        created_at: new Date(),
      },
    ])
  }
}
