import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class UserSeeder extends BaseSeeder {
  async run() {
    // Primeiro usuário - Admin
    await User.create({
      name: 'Administrador',
      email: 'admin@betalent.tech',
      password: '123456',
      role: 'ADMIN'
    })

    // Segundo usuário - Comum
    await User.create({
      name: 'Usuário Comum',
      email: 'user@betalent.tech',
      password: '123456',
      role: 'USER'
    })
  }
}