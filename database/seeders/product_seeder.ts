import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Product from '#models/product'

export default class ProductSeeder extends BaseSeeder {
  async run() {
    await Product.createMany([
      {
        name: 'Curso de Node.js',
        amount: 2990
      },
      {
        name: 'Curso de React',
        amount: 3990
      },
      {
        name: 'Curso de TypeScript',
        amount: 2490
      }
    ])
  }
}