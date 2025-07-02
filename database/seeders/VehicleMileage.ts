import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Database from '@ioc:Adonis/Lucid/Database'

export default class extends BaseSeeder {
  public async run () {
    await Database.table('vehicle_mileages').insert([
      {
        title: 'Under 10,000',
        slug: 'under-10000',
        mileage: 10000,
        created_at: new Date(),
      },
      {
        title: 'Under 25,000',
        slug: 'under-25000',
        mileage: 25000,
        created_at: new Date(),
      },
      {
        title: 'Under 50,000',
        slug: 'under-50000',
        mileage: 50000,
        created_at: new Date(),
      },
      {
        title: 'Under 75,000',
        slug: 'under-75000',
        mileage: 75000,
        created_at: new Date(),
      },
      {
        title: 'Under 100,000',
        slug: 'under-100000',
        mileage: 100000,
        created_at: new Date(),
      },
      {
        title: '100,001 +',
        slug: '100001-plus',
        mileage: 100001,
        created_at: new Date(),
      },
    ])
  }
}
