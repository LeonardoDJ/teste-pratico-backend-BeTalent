import type { HttpContext } from '@adonisjs/core/http'
import Client from '#models/client'

export default class ClientController {
  
  /**
   * GET /clientes - Listar todos os clientes
   */
  async index({ response }: HttpContext) {
    const clients = await Client.all()
    return response.ok(clients)
  }

  /**
   * GET /clientes/:id - Mostrar um cliente e suas compras
   */
  async show({ params, response }: HttpContext) {
    const client = await Client.query()
      .where('id', params.id)
      .preload('transactions', (query) => {
        query.preload('products', (productsQuery) => {
          productsQuery.preload('product')
        })
      })
      .first()

    if (!client) {
      return response.notFound({ 
        erro: 'Cliente não encontrado' 
      })
    }

    return response.ok(client)
  }
}