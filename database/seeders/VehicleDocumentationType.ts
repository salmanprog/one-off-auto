import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Database from '@ioc:Adonis/Lucid/Database'

export default class extends BaseSeeder {
  public async run () {
    await Database.table('vehicle_documentation_types').insert([
      {
        title: 'Dyno Sheet',
        slug: 'dyno-sheet',
        created_at: new Date(),
      },
      {
        title: 'Build Sheet',
        slug: 'build-sheet',
        created_at: new Date(),
      },
      {
        title: 'Maintenance Records Available',
        slug: 'maintenance-records-available',
        created_at: new Date(),
      },
      {
        title: 'Receipts for Mods',
        slug: 'receipts-for-mods',
        created_at: new Date(),
      },
      {
        title: 'Professional Build Documentation',
        slug: 'professional-build-documentation',
        created_at: new Date(),
      },
      {
        title: 'DIY',
        slug: 'diy',
        created_at: new Date(),
      },
    ])
  }
}
