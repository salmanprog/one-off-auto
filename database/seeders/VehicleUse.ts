import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Database from '@ioc:Adonis/Lucid/Database'

export default class extends BaseSeeder {
  public async run () {
    await Database.table('vehicle_uses').insert([
      {
        title: 'Daily Driver',
        slug: 'daily-driver',
        created_at: new Date(),
      },
      {
        title: 'Track Ready',
        slug: 'track-ready',
        created_at: new Date(),
      },
      {
        title: 'Show Car/Trailer Queen',
        slug: 'show-car-trailer-queen',
        created_at: new Date(),
      },
      {
        title: 'Project Car/Need Work',
        slug: 'project-car-need-work',
        created_at: new Date(),
      },
      {
        title: 'Garage Kept',
        slug: 'garage-kept',
        created_at: new Date(),
      },
      {
        title: 'Turn Key Build',
        slug: 'turn-key-build',
        created_at: new Date(),
      },
      {
        title: 'Off Road',
        slug: 'off-road',
        created_at: new Date(),
      },
      {
        title: 'Overland',
        slug: 'overland',
        created_at: new Date(),
      },
      {
        title: 'Other',
        slug: 'other',
        created_at: new Date(),
      },
    ])
  }
}
