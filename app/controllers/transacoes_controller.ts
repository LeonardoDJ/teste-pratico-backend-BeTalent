import type { HttpContext } from '@adonisjs/core/http'
import Transaction from '#models/transaction'

export default class TransactionController {
  
  /**
   * GET /transacoes - Listar todas as transações
   */
  async index({ response }: HttpContext) {
    const transactions = await Transaction.query()
      .preload('client')
      .preload('gateway')
      .preload('products', (query) => {
        query.preload('product')
      })
      .orderBy('created_at', 'desc')

    return response.ok(transactions)
  }

  /**
   * GET /transacoes/:id - Mostrar uma transação específica
   */
  async show({ params, response }: HttpContext) {
    const transaction = await Transaction.query()
      .where('id', params.id)
      .preload('client')
      .preload('gateway')
      .preload('products', (query) => {
        query.preload('product')
      })
      .first()

    if (!transaction) {
      return response.notFound({ 
        erro: 'Transação não encontrada' 
      })
    }

    return response.ok(transaction)
  }
}