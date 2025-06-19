import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Database from '@ioc:Adonis/Lucid/Database'

export default class extends BaseSeeder {
  public async run () {
    await Database.table('vehicle_models').insert([
      {
        title: 'A3',
        slug: 'a3',
        make_id: '1',
        year: '2024',
        description: 'A3',
        created_at: new Date(),
      },
      {
        title: 'A4',
        slug: 'a4',
        make_id: '1',
        year: '2024',
        description: 'Audi',
        created_at: new Date(),
      },
      {
        title: 'A5 Sportback',
        slug: 'a5-sportback',
        make_id: '1',
        year: '2024',
        description: 'A5 Sportback',
        created_at: new Date(),
      },
      {
        title: '2 Series',
        slug: '2-series',
        make_id: '2',
        year: '2024',
        description: '2 Series',
        created_at: new Date(),
      },
      {
        title: '7 Series',
        slug: '7-series',
        make_id: '2',
        year: '2024',
        description: '7 Series',
        created_at: new Date(),
      },
      {
        title: 'M2',
        slug: 'm2',
        make_id: '2',
        year: '2024',
        description: 'M2',
        created_at: new Date(),
      },
      {
        title: 'Corvette',
        slug: 'corvette',
        make_id: '3',
        year: '2022',
        description: 'Honda',
        created_at: new Date(),
      },
      {
        title: 'Equinox',
        slug: 'equinox',
        make_id: '3',
        year: '2000',
        description: 'Equinox',
        created_at: new Date(),
      },
      {
        title: 'Equinox EV',
        slug: 'equinox-ev',
        make_id: '3',
        year: '2021',
        description: 'Equinox EV',
        created_at: new Date(),
      },
      {
        title: 'GT-R',
        slug: 'gt-r',
        make_id: '4',
        year: '2023',
        description: 'GT-R',
        created_at: new Date(),
      },{
        title: 'Murano',
        slug: 'murano',
        make_id: '4',
        year: '2025',
        description: 'Murano',
        created_at: new Date(),
      },{
        title: 'Bronco',
        slug: 'bronco',
        make_id: '5',
        year: '1998',
        description: 'Bronco',
        created_at: new Date(),
      },{
        title: 'Bronco Sport',
        slug: 'bronco-sport',
        make_id: '5',
        year: '1999',
        description: 'Bronco Sport',
        created_at: new Date(),
      },{
        title: 'E-Transit 350 Cargo Van',
        slug: 'honE-transit-350-cargo-van',
        make_id: '5',
        year: '2000',
        description: 'E-Transit 350 Cargo Van',
        created_at: new Date(),
      },
    ])
  }
}
