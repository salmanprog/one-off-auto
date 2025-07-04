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
      {
        title: 'Toyota',
        slug: 'toyota',
        description: 'Toyota',
        created_at: new Date(),
      },
      {
        title: 'Honda',
        slug: 'honda',
        description: 'Honda',
        created_at: new Date(),
      },
      {
        title: 'Volkswagen',
        slug: 'volkswagen',
        description: 'Volkswagen',
        created_at: new Date(),
      },
      {
        title: 'Hyundai',
        slug: 'hyundai',
        description: 'Hyundai',
        created_at: new Date(),
      },
      {
        title: 'Mercedes-Benz',
        slug: 'mercedes-benz',
        description: 'Mercedes-Benz',
        created_at: new Date(),
      }
    ])
  }
}
