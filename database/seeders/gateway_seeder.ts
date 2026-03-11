import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Gateway from '#models/gateway'

export default class GatewaySeeder extends BaseSeeder {
  async run() {
    await Gateway.createMany([
      {
        name: 'Gateway1',
        url: 'http://localhost:3001',
        isActive: true,
        priority: 1
      },
      {
        name: 'Gateway2',
        url: 'http://localhost:3002',
        isActive: true,
        priority: 2
      }
    ])
  }
}