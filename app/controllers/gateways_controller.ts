import type { HttpContext } from '@adonisjs/core/http'
import Gateway from '#models/gateway'

export default class GatewayController {
  
  /**
   * GET /gateways - Listar todos os gateways
   */
  async index({ response }: HttpContext) {
    const gateways = await Gateway.query().orderBy('priority', 'asc')
    return response.ok(gateways)
  }

  /**
   * PUT /gateways/:id/toggle - Ativar/desativar um gateway
   */
  async toggle({ params, response }: HttpContext) {
    try {
      const gateway = await Gateway.find(params.id)
      
      if (!gateway) {
        return response.notFound({ 
          erro: 'Gateway não encontrado' 
        })
      }

      // Inverte o status (true vira false, false vira true)
      gateway.isActive = !gateway.isActive
      await gateway.save()

      const status = gateway.isActive ? 'ativado' : 'desativado'
      
      return response.ok({
        mensagem: `Gateway ${status} com sucesso`,
        gateway
      })
    } catch (error) {
      return response.badRequest({ 
        erro: error.message 
      })
    }
  }

  /**
   * PUT /gateways/:id/priority - Mudar prioridade do gateway
   */
  async priority({ params, request, response }: HttpContext) {
    try {
      const { priority } = request.only(['priority'])
      
      if (!priority || priority < 1) {
        return response.badRequest({
          erro: 'Prioridade deve ser um número maior que 0'
        })
      }
      
      const gateway = await Gateway.find(params.id)
      
      if (!gateway) {
        return response.notFound({ 
          erro: 'Gateway não encontrado' 
        })
      }

      gateway.priority = priority
      await gateway.save()

      return response.ok({
        mensagem: 'Prioridade atualizada com sucesso',
        gateway
      })
    } catch (error) {
      return response.badRequest({ 
        erro: error.message 
      })
    }
  }
}