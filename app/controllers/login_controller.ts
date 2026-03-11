import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  
  /**
   * POST /login - Faz o login do usuário
   */
  async login({ request, response }: HttpContext) {
    try {
      // Pega email e senha do corpo da requisição
      const { email, password } = request.only(['email', 'password'])
      
      // Validação simples
      if (!email || !password) {
        return response.badRequest({
          erro: 'Email e senha são obrigatórios'
        })
      }
      
      // Procura o usuário no banco
      const user = await User.findBy('email', email)
      
      // Se não encontrar, retorna erro
      if (!user) {
        return response.unauthorized({
          erro: 'Email ou senha inválidos'
        })
      }

      // Verifica se a senha está correta
      const senhaValida = await hash.verify(user.password, password)
      
      if (!senhaValida) {
        return response.unauthorized({
          erro: 'Email ou senha inválidos'
        })
      }

      // Gera o token de acesso para o usuário
      const token = await User.accessTokens.create(user)
      
      // Retorna os dados do usuário e o token
      return response.ok({
        token: token,
        usuario: {
          id: user.id,
          nome: user.name,
          email: user.email,
          cargo: user.role
        }
      })
    } catch (error) {
      return response.badRequest({
        erro: error.message
      })
    }
  }

  /**
   * POST /logout - Faz logout do usuário
   */
  async logout({ response, auth }: HttpContext) {
    try {
      // Pega o token atual e revoga
      const user = auth.user
      if (user) {
        await User.accessTokens.delete(user, user.currentAccessToken.identifier)
      }
      
      return response.ok({
        mensagem: 'Logout realizado com sucesso'
      })
    } catch (error) {
      return response.badRequest({
        erro: error.message
      })
    }
  }
}