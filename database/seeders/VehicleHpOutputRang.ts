import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Database from '@ioc:Adonis/Lucid/Database'

export default class extends BaseSeeder {
  public async run () {
    await Database.table('vehicle_hp_output_rangs').insert([
      {
        title: '0-99',
        slug: '0-99',
        created_at: new Date(),
      },
      {
        title: '100-199',
        slug: '100-199',
        created_at: new Date(),
      },
      {
        title: '200-299',
        slug: '200-299',
        created_at: new Date(),
      },
      {
        title: '300-399',
        slug: '300-399',
        created_at: new Date(),
      },
      {
        title: '400-499',
        slug: '400-499',
        created_at: new Date(),
      },
      {
        title: '500-599',
        slug: '500-599',
        created_at: new Date(),
      },
      {
        title: '600-699',
        slug: '600-699',
        created_at: new Date(),
      },
      {
        title: '700-799',
        slug: '700-799',
        created_at: new Date(),
      },
      {
        title: '800-899',
        slug: '800-899',
        created_at: new Date(),
      },
      {
        title: '900-999',
        slug: '900-999',
        created_at: new Date(),
      },
      {
        title: '1000+',
        slug: '1000-plus',
        created_at: new Date(),
      },
    ])
  }
}
