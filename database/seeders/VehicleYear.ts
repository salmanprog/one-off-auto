import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Database from '@ioc:Adonis/Lucid/Database'

export default class extends BaseSeeder {
  public async run () {
    await Database.table('vehicle_years').insert([
      { title: '2000', slug: 'year-2000', created_at: new Date() },
      { title: '2001', slug: 'year-2001', created_at: new Date() },
      { title: '2002', slug: 'year-2002', created_at: new Date() },
      { title: '2003', slug: 'year-2003', created_at: new Date() },
      { title: '2004', slug: 'year-2004', created_at: new Date() },
      { title: '2005', slug: 'year-2005', created_at: new Date() },
      { title: '2006', slug: 'year-2006', created_at: new Date() },
      { title: '2007', slug: 'year-2007', created_at: new Date() },
      { title: '2008', slug: 'year-2008', created_at: new Date() },
      { title: '2009', slug: 'year-2009', created_at: new Date() },
      { title: '2010', slug: 'year-2010', created_at: new Date() },
      { title: '2011', slug: 'year-2011', created_at: new Date() },
      { title: '2012', slug: 'year-2012', created_at: new Date() },
      { title: '2013', slug: 'year-2013', created_at: new Date() },
      { title: '2014', slug: 'year-2014', created_at: new Date() },
      { title: '2015', slug: 'year-2015', created_at: new Date() },
      { title: '2016', slug: 'year-2016', created_at: new Date() },
      { title: '2017', slug: 'year-2017', created_at: new Date() },
      { title: '2018', slug: 'year-2018', created_at: new Date() },
      { title: '2019', slug: 'year-2019', created_at: new Date() },
      { title: '2020', slug: 'year-2020', created_at: new Date() },
      { title: '2021', slug: 'year-2021', created_at: new Date() },
      { title: '2022', slug: 'year-2022', created_at: new Date() },
      { title: '2023', slug: 'year-2023', created_at: new Date() },
      { title: '2024', slug: 'year-2024', created_at: new Date() },
      { title: '2025', slug: 'year-2025', created_at: new Date() },
      { title: '2026', slug: 'year-2026', created_at: new Date() },
      { title: '2027', slug: 'year-2027', created_at: new Date() },
      { title: '2028', slug: 'year-2028', created_at: new Date() },
      { title: '2029', slug: 'year-2029', created_at: new Date() },
      { title: '2030', slug: 'year-2030', created_at: new Date() },
    ])
  }
}
