/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

// Rotas públicas da API
router.post('/login', '#controllers/login_controller.login')
router.post('/comprar', '#controllers/compras_controller.store')

// Rotas privadas da API (precisam de autenticação)
router.group(() => {
  
  // Gateways
  router.get('/gateways', '#controllers/gateways_controller.index')
  router.put('/gateways/:id/toggle', '#controllers/gateways_controller.toggle')
  router.put('/gateways/:id/priority', '#controllers/gateways_controller.priority')
  
  // Produtos
  router.get('/products', '#controllers/produtos_controller.index')
  router.post('/products', '#controllers/produtos_controller.store')
  router.get('/products/:id', '#controllers/produtos_controller.show')
  router.put('/products/:id', '#controllers/produtos_controller.update')
  router.delete('/products/:id', '#controllers/produtos_controller.destroy')
  
  // Clientes
  router.get('/clientes', '#controllers/clientes_controller.index')
  router.get('/clientes/:id', '#controllers/clientes_controller.show')
  
  // Transações
  router.get('/transacoes', '#controllers/transacoes_controller.index')
  router.get('/transacoes/:id', '#controllers/transacoes_controller.show')
  
  // Logout
  router.post('/logout', '#controllers/login_controller.logout')
  
}).use(middleware.auth())