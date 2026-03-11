import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'

export default class ProductController {
  
  /**
   * GET /products - Listar todos os produtos
   */
  async index({ response }: HttpContext) {
    const products = await Product.all()
    return response.ok(products)
  }

  /**
   * POST /products - Criar um novo produto
   */
  async store({ request, response }: HttpContext) {
    try {
      const { name, amount } = request.only(['name', 'amount'])
      
      // Validação simples
      if (!name || name.length < 3) {
        return response.badRequest({
          erro: 'Nome precisa ter pelo menos 3 caracteres'
        })
      }
      
      if (!amount || amount < 1) {
        return response.badRequest({
          erro: 'Valor precisa ser maior que 0 (em centavos)'
        })
      }
      
      const product = await Product.create({ name, amount })
      return response.created(product)
    } catch (error) {
      return response.badRequest({ 
        erro: error.message 
      })
    }
  }

  /**
   * GET /products/:id - Mostrar um produto específico
   */
  async show({ params, response }: HttpContext) {
    const product = await Product.find(params.id)
    
    if (!product) {
      return response.notFound({ 
        erro: 'Produto não encontrado' 
      })
    }

    return response.ok(product)
  }

  /**
   * PUT /products/:id - Atualizar um produto
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const product = await Product.find(params.id)
      
      if (!product) {
        return response.notFound({ 
          erro: 'Produto não encontrado' 
        })
      }

      const { name, amount } = request.only(['name', 'amount'])
      
      if (name) product.name = name
      if (amount) product.amount = amount
      
      await product.save()

      return response.ok(product)
    } catch (error) {
      return response.badRequest({ 
        erro: error.message 
      })
    }
  }

  /**
   * DELETE /products/:id - Deletar um produto
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const product = await Product.find(params.id)
      
      if (!product) {
        return response.notFound({ 
          erro: 'Produto não encontrado' 
        })
      }

      await product.delete()
      return response.noContent()
    } catch (error) {
      return response.badRequest({ 
        erro: error.message 
      })
    }
  }
}