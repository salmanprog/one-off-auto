import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Database from '@ioc:Adonis/Lucid/Database'

export default class extends BaseSeeder {
  public async run () {
    await Database.table('vehicle_makes').insert([
      {
        title: 'Audi',
        slug: 'audi',
        description: 'Audi',
        created_at: new Date(),
      },
      {
        title: 'BMW',
        slug: 'bmw',
        description: 'BMW',
        created_at: new Date(),
      },
      {
        title: 'Chevrolet',
        slug: 'chevrolet',
        description: 'Chevrolet',
        created_at: new Date(),
      },
      {
        title: 'Nissan',
        slug: 'nissan',
        description: 'Nissan',
        created_at: new Date(),
      },
      {
        title: 'Ford',
        slug: 'ford',
        description: 'Ford',
        created_at: new Date(),
      },
      
    ])
  }
}
