import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Database from '@ioc:Adonis/Lucid/Database'

export default class extends BaseSeeder {
  public async run () {
    await Database.table('vehicle_models').insert([
      // Audi Models
      {
        title: 'A3',
        slug: 'a3',
        make_id: '1', // Audi
        year: '2024',
        description: 'A3',
        created_at: new Date(),
      },
      {
        title: 'A4',
        slug: 'a4',
        make_id: '1', // Audi
        year: '2024',
        description: 'A4',
        created_at: new Date(),
      },
      {
        title: 'A5 Sportback',
        slug: 'a5-sportback',
        make_id: '1', // Audi
        year: '2024',
        description: 'A5 Sportback',
        created_at: new Date(),
      },
      {
        title: 'Q5',
        slug: 'q5',
        make_id: '1', // Audi
        year: '2024',
        description: 'Q5',
        created_at: new Date(),
      },
      {
        title: 'A6',
        slug: 'a6',
        make_id: '1', // Audi
        year: '2024',
        description: 'A6',
        created_at: new Date(),
      },
      {
        title: 'Q7',
        slug: 'q7',
        make_id: '1', // Audi
        year: '2024',
        description: 'Q7',
        created_at: new Date(),
      },
    
      // BMW Models
      {
        title: '2 Series',
        slug: '2-series',
        make_id: '2', // BMW
        year: '2024',
        description: '2 Series',
        created_at: new Date(),
      },
      {
        title: '3 Series',
        slug: '3-series',
        make_id: '2', // BMW
        year: '2024',
        description: '3 Series',
        created_at: new Date(),
      },
      {
        title: '5 Series',
        slug: '5-series',
        make_id: '2', // BMW
        year: '2024',
        description: '5 Series',
        created_at: new Date(),
      },
      {
        title: 'X3',
        slug: 'x3',
        make_id: '2', // BMW
        year: '2024',
        description: 'X3',
        created_at: new Date(),
      },
      {
        title: 'X5',
        slug: 'x5',
        make_id: '2', // BMW
        year: '2024',
        description: 'X5',
        created_at: new Date(),
      },
      {
        title: '7 Series',
        slug: '7-series',
        make_id: '2', // BMW
        year: '2024',
        description: '7 Series',
        created_at: new Date(),
      },
    
      // Chevrolet Models
      {
        title: 'Corvette',
        slug: 'corvette',
        make_id: '3', // Chevrolet
        year: '2022',
        description: 'Corvette',
        created_at: new Date(),
      },
      {
        title: 'Equinox',
        slug: 'equinox',
        make_id: '3', // Chevrolet
        year: '2000',
        description: 'Equinox',
        created_at: new Date(),
      },
      {
        title: 'Equinox EV',
        slug: 'equinox-ev',
        make_id: '3', // Chevrolet
        year: '2021',
        description: 'Equinox EV',
        created_at: new Date(),
      },
      {
        title: 'Silverado',
        slug: 'silverado',
        make_id: '3', // Chevrolet
        year: '2023',
        description: 'Silverado',
        created_at: new Date(),
      },
      {
        title: 'Malibu',
        slug: 'malibu',
        make_id: '3', // Chevrolet
        year: '2022',
        description: 'Malibu',
        created_at: new Date(),
      },
      {
        title: 'Camaro',
        slug: 'camaro',
        make_id: '3', // Chevrolet
        year: '2022',
        description: 'Camaro',
        created_at: new Date(),
      },
    
      // Nissan Models
      {
        title: 'GT-R',
        slug: 'gt-r',
        make_id: '4', // Nissan
        year: '2023',
        description: 'GT-R',
        created_at: new Date(),
      },
      {
        title: 'Murano',
        slug: 'murano',
        make_id: '4', // Nissan
        year: '2025',
        description: 'Murano',
        created_at: new Date(),
      },
      {
        title: 'Altima',
        slug: 'altima',
        make_id: '4', // Nissan
        year: '2024',
        description: 'Altima',
        created_at: new Date(),
      },
      {
        title: 'Maxima',
        slug: 'maxima',
        make_id: '4', // Nissan
        year: '2022',
        description: 'Maxima',
        created_at: new Date(),
      },
      {
        title: 'Rogue',
        slug: 'rogue',
        make_id: '4', // Nissan
        year: '2023',
        description: 'Rogue',
        created_at: new Date(),
      },
      {
        title: 'Sentra',
        slug: 'sentra',
        make_id: '4', // Nissan
        year: '2023',
        description: 'Sentra',
        created_at: new Date(),
      },
    
      // Ford Models
      {
        title: 'Bronco',
        slug: 'bronco',
        make_id: '5', // Ford
        year: '1998',
        description: 'Bronco',
        created_at: new Date(),
      },
      {
        title: 'Bronco Sport',
        slug: 'bronco-sport',
        make_id: '5', // Ford
        year: '1999',
        description: 'Bronco Sport',
        created_at: new Date(),
      },
      {
        title: 'F-150',
        slug: 'f-150',
        make_id: '5', // Ford
        year: '2022',
        description: 'F-150',
        created_at: new Date(),
      },
      {
        title: 'Mustang',
        slug: 'mustang',
        make_id: '5', // Ford
        year: '2022',
        description: 'Mustang',
        created_at: new Date(),
      },
      {
        title: 'Explorer',
        slug: 'explorer',
        make_id: '5', // Ford
        year: '2021',
        description: 'Explorer',
        created_at: new Date(),
      },
      {
        title: 'Fusion',
        slug: 'fusion',
        make_id: '5', // Ford
        year: '2020',
        description: 'Fusion',
        created_at: new Date(),
      },
    
      // Toyota Models
      {
        title: 'Corolla',
        slug: 'corolla',
        make_id: '6', // Toyota
        year: '2024',
        description: 'Corolla',
        created_at: new Date(),
      },
      {
        title: 'Camry',
        slug: 'camry',
        make_id: '6', // Toyota
        year: '2024',
        description: 'Camry',
        created_at: new Date(),
      },
      {
        title: 'Rav4',
        slug: 'rav4',
        make_id: '6', // Toyota
        year: '2024',
        description: 'Rav4',
        created_at: new Date(),
      },
      {
        title: 'Highlander',
        slug: 'highlander',
        make_id: '6', // Toyota
        year: '2024',
        description: 'Highlander',
        created_at: new Date(),
      },
      {
        title: 'Prius',
        slug: 'prius',
        make_id: '6', // Toyota
        year: '2024',
        description: 'Prius',
        created_at: new Date(),
      },
    
      // Honda Models
      {
        title: 'Civic',
        slug: 'civic',
        make_id: '7', // Honda
        year: '2024',
        description: 'Civic',
        created_at: new Date(),
      },
      {
        title: 'Accord',
        slug: 'accord',
        make_id: '7', // Honda
        year: '2024',
        description: 'Accord',
        created_at: new Date(),
      },
      {
        title: 'CR-V',
        slug: 'cr-v',
        make_id: '7', // Honda
        year: '2024',
        description: 'CR-V',
        created_at: new Date(),
      },
      {
        title: 'Pilot',
        slug: 'pilot',
        make_id: '7', // Honda
        year: '2024',
        description: 'Pilot',
        created_at: new Date(),
      },
      {
        title: 'Odyssey',
        slug: 'odyssey',
        make_id: '7', // Honda
        year: '2024',
        description: 'Odyssey',
        created_at: new Date(),
      },
    
      // Volkswagen Models
      {
        title: 'Jetta',
        slug: 'jetta',
        make_id: '8', // Volkswagen
        year: '2024',
        description: 'Jetta',
        created_at: new Date(),
      },
      {
        title: 'Golf',
        slug: 'golf',
        make_id: '8', // Volkswagen
        year: '2024',
        description: 'Golf',
        created_at: new Date(),
      },
      {
        title: 'Passat',
        slug: 'passat',
        make_id: '8', // Volkswagen
        year: '2024',
        description: 'Passat',
        created_at: new Date(),
      },
      {
        title: 'Tiguan',
        slug: 'tiguan',
        make_id: '8', // Volkswagen
        year: '2024',
        description: 'Tiguan',
        created_at: new Date(),
      },
      {
        title: 'Atlas',
        slug: 'atlas',
        make_id: '8', // Volkswagen
        year: '2024',
        description: 'Atlas',
        created_at: new Date(),
      },
    
      // Hyundai Models
      {
        title: 'Elantra',
        slug: 'elantra',
        make_id: '9', // Hyundai
        year: '2024',
        description: 'Elantra',
        created_at: new Date(),
      },
      {
        title: 'Sonata',
        slug: 'sonata',
        make_id: '9', // Hyundai
        year: '2024',
        description: 'Sonata',
        created_at: new Date(),
      },
      {
        title: 'Tucson',
        slug: 'tucson',
        make_id: '9', // Hyundai
        year: '2024',
        description: 'Tucson',
        created_at: new Date(),
      },
      {
        title: 'Santa Fe',
        slug: 'santa-fe',
        make_id: '9', // Hyundai
        year: '2024',
        description: 'Santa Fe',
        created_at: new Date(),
      },
      {
        title: 'Kona',
        slug: 'kona',
        make_id: '9', // Hyundai
        year: '2024',
        description: 'Kona',
        created_at: new Date(),
      }
    ])
  }
}
