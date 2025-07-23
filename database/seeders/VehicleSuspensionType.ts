import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Database from '@ioc:Adonis/Lucid/Database'

export default class extends BaseSeeder {
  public async run () {
    await Database.table('vehicle_suspension_types').insert([
      {
        title: 'Air Ride',
        slug: 'air-ride',
        created_at: new Date(),
      },
      {
        title: 'Hydraulic',
        slug: 'hydraulic',
        created_at: new Date(),
      },
      {
        title: 'Any Level',
        slug: 'any-level',
        created_at: new Date(),
      },
      {
        title: 'Leveling Kit',
        slug: 'leveling-kit',
        created_at: new Date(),
      },
      {
        title: 'Coil Overs',
        slug: 'coil-overs',
        created_at: new Date(),
      },
      {
        title: 'Body Lift',
        slug: 'body-lift',
        created_at: new Date(),
      },
      {
        title: 'Drop Kit',
        slug: 'drop-kit',
        created_at: new Date(),
      },
      {
        title: 'Lift Kit',
        slug: 'lift-kit',
        created_at: new Date(),
      },
    ])
  }
}
