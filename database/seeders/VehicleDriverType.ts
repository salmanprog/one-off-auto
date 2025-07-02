import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Database from '@ioc:Adonis/Lucid/Database'

export default class extends BaseSeeder {
  public async run () {
    await Database.table('vehicle_driver_types').insert([
      {
        title: 'FWD',
        slug: 'fwd',
        created_at: new Date(),
      },
      {
        title: 'RWD',
        slug: 'rwd',
        created_at: new Date(),
      },
      {
        title: 'AWD',
        slug: 'awd',
        created_at: new Date(),
      },
      {
        title: '4WD',
        slug: '4wd',
        created_at: new Date(),
      },
    ])
  }
}
