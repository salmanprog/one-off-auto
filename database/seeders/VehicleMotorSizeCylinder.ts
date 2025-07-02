import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Database from '@ioc:Adonis/Lucid/Database'

export default class extends BaseSeeder {
  public async run () {
    await Database.table('vehicle_motor_size_cylinders').insert([
      {
        title: '3 Cyl',
        slug: '3-cyl',
        created_at: new Date(),
      },
      {
        title: '4 Cyl',
        slug: '4-cyl',
        created_at: new Date(),
      },
      {
        title: '5 Cyl',
        slug: '5-cyl',
        created_at: new Date(),
      },
      
      {
        title: '6 Cyl',
        slug: '6-cyl',
        created_at: new Date(),
      },
      {
        title: '8 Cyl',
        slug: '8-cyl',
        created_at: new Date(),
      },
      {
        title: '10 Cyl',
        slug: '10-cyl',
        created_at: new Date(),
      },
      {
        title: '12 Cyl',
        slug: '12-cyl',
        created_at: new Date(),
      },
      {
        title: '16 Cyl',
        slug: '16-cyl',
        created_at: new Date(),
      },
      {
        title: 'Rotary',
        slug: 'rotary',
        created_at: new Date(),
      },
    ])
  }
}
