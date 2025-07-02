import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Database from '@ioc:Adonis/Lucid/Database'

export default class extends BaseSeeder {
  public async run () {
    await Database.table('vehicle_statuses').insert([
      {
        title: 'Clean',
        slug: 'clean',
        created_at: new Date(),
      },
      {
        title: 'Salvage',
        slug: 'salvage',
        created_at: new Date(),
      },
      {
        title: 'Rebuilt/Reconstructed',
        slug: 'rebuilt-reconstructed',
        created_at: new Date(),
      },
      {
        title: 'Flood',
        slug: 'flood',
        created_at: new Date(),
      },
      {
        title: 'Bonded',
        slug: 'bonded',
        created_at: new Date(),
      },
      {
        title: 'Lemon',
        slug: 'lemon',
        created_at: new Date(),
      },
      {
        title: 'Junk/Certificate of Destruction',
        slug: 'junk-certificate-of-destruction',
        created_at: new Date(),
      },
      {
        title: 'Theft Recovery',
        slug: 'theft-recovery',
        created_at: new Date(),
      },
      {
        title: 'Odometer Rollback',
        slug: 'odometer-rollback',
        created_at: new Date(),
      },
      {
        title: 'Export Only',
        slug: 'export-only',
        created_at: new Date(),
      },
      {
        title: 'Dismantled/Parts Only',
        slug: 'dismantled-parts-only',
        created_at: new Date(),
      },
    ])
  }
}
