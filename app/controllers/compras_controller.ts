import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'
import Client from '#models/client'
import Transaction from '#models/transaction'
import TransactionProduct from '#models/transaction_product'
import axios from 'axios'

export default class PurchaseController {
  
  /**
   * POST /comprar - Realiza uma compra
   */
  async store({ request, response }: HttpContext) {
    try {
      // Pega os dados da compra
      const { product_id, name, email, card_number, cvv } = request.only([
        'product_id', 'name', 'email', 'card_number', 'cvv'
      ])
      
      // Validação simples
      if (!product_id || !name || !email || !card_number || !cvv) {
        return response.badRequest({
          erro: 'Todos os campos são obrigatórios'
        })
      }
      
      // Busca o produto
      const produto = await Product.find(product_id)
      if (!produto) {
        return response.badRequest({
          erro: 'Produto não encontrado'
        })
      }
      
      // Busca ou cria o cliente
      let cliente = await Client.findBy('email', email)
      if (!cliente) {
        cliente = await Client.create({ name, email })
      }
      
      // Busca os gateways ativos
      const { default: Gateway } = await import('#models/gateway')
      const gateways = await Gateway.query()
        .where('is_active', true)
        .orderBy('priority', 'asc')
      
      if (gateways.length === 0) {
        return response.badRequest({
          erro: 'Nenhum gateway disponível no momento'
        })
      }
      
      // Tenta cada gateway
      let transacaoSalva = null
      let ultimoErro = ''
      
      for (const gateway of gateways) {
        try {
          console.log(`Tentando gateway: ${gateway.name}`)
          
          let resposta
          
          // Gateway 1
          if (gateway.name === 'Gateway1') {
            const payload = {
              amount: produto.amount,
              name: cliente.name,
              email: cliente.email,
              cardNumber: card_number,
              cvv: cvv
            }
            
            resposta = await axios.post('http://localhost:3001/transactions', payload)
          }
          // Gateway 2
          else if (gateway.name === 'Gateway2') {
            const payload = {
              valor: produto.amount,
              nome: cliente.name,
              email: cliente.email,
              numeroCartao: card_number,
              cvv: cvv
            }
            
            resposta = await axios.post('http://localhost:3002/transacoes', payload)
          }
          
          // Se deu certo
          if (resposta && resposta.data) {
            // Salva a transação
            const transacao = await Transaction.create({
              clientId: cliente.id,
              gatewayId: gateway.id,
              externalId: resposta.data.id,
              status: 'paid',
              amount: produto.amount,
              cardLastNumbers: card_number.slice(-4)
            })
            
            // Salva o produto da transação
            await TransactionProduct.create({
              transactionId: transacao.id,
              productId: produto.id,
              quantity: 1
            })
            
            transacaoSalva = transacao
            break // Sai do loop se deu certo
          }
        } catch (error: any) {
          console.log(`Erro no gateway ${gateway.name}:`, error.message)
          ultimoErro = error.message
          continue // Tenta o próximo
        }
      }
      
      if (!transacaoSalva) {
        return response.badRequest({
          erro: `Todos os gateways falharam: ${ultimoErro}`
        })
      }
      
      return response.created({
        mensagem: 'Compra realizada com sucesso!',
        transacao: {
          id: transacaoSalva.id,
          status: transacaoSalva.status,
          valor: transacaoSalva.amount,
          cartaoFinal: transacaoSalva.cardLastNumbers,
          data: transacaoSalva.createdAt
        }
      })
      
    } catch (error) {
      console.log('Erro na compra:', error)
      return response.badRequest({
        erro: error.message
      })
    }
  }
}