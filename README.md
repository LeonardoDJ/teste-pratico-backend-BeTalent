teste-pratico-backend-BeTalent
API de pagamentos desenvolvida para o teste prático da BeTalent.
Nível 1 concluído.

🧠 Sobre o projeto
É uma API que processa pagamentos com fallback entre dois gateways:

Tenta primeiro no Gateway 1

Se der erro, tenta no Gateway 2

Se os dois falharem, retorna erro

🛠 Tecnologias
Node.js + AdonisJS 6

MySQL

Docker (gateways mock)

Postman (testes)

Lucid ORM

VineJS (validação)

⏱ Tempo de desenvolvimento
Levei cerca de 1 dia inteiro pra fazer o Nível 1.
Como não estou trabalhando no momento, consegui focar bastante.

📦 Como rodar
bash
# Clone
git clone https://github.com/LeonardoDJ/teste-pratico-backend-BeTalent.git
cd teste-pratico-backend-BeTalent

# Instale as dependências
npm install

# Configure o banco MySQL (crie um banco chamado betalent_payment)
# Copie .env.example para .env e ajuste as credenciais

# Rode as migrations e seeders
node ace migration:run
node ace db:seed

# Inicie os gateways mock (precisa do Docker)
docker run -p 3001:3001 -p 3002:3002 -e REMOVE_AUTH='true' matheusprotzen/gateways-mock

# Inicie o servidor
npm run dev
A API roda em http://localhost:3333

🔐 Como testar (Postman)
Login (pegar token)
text
POST http://localhost:3333/login
{
  "email": "admin@betalent.tech",
  "password": "123456"
}
Usar token nas rotas privadas
text
Authorization: Bearer SEU_TOKEN_AQUI
📍 Rotas
Públicas
POST /login - Login

POST /comprar - Compra

Privadas (token)
GET /gateways - Listar gateways

PUT /gateways/:id/toggle - Ativar/desativar

PUT /gateways/:id/priority - Mudar prioridade

GET /products - Listar produtos

POST /products - Criar produto

GET /products/:id - Ver produto

PUT /products/:id - Atualizar produto

DELETE /products/:id - Deletar produto

GET /clientes - Listar clientes

GET /clientes/:id - Cliente + compras

GET /transacoes - Listar transações

GET /transacoes/:id - Ver transação

POST /logout - Logout

💰 Exemplo de compra
json
POST /comprar
{
  "product_id": 1,
  "name": "João Silva",
  "email": "joao@email.com",
  "card_number": "5569000000006063",
  "cvv": "010"
}
Resposta:

json
{
  "mensagem": "Compra realizada com sucesso!",
  "transacao": {
    "id": 1,
    "status": "paid",
    "valor": 2990,
    "cartaoFinal": "6063"
  }
}
⚠️ Testando fallback
Gateway 1 falha com CVV 100 ou 200

Gateway 2 falha com CVV 200 ou 300

Exemplo: cvv: 100 → Gateway 1 falha, Gateway 2 tenta

🗂 Dados iniciais (seeders)
Usuários:

admin@betalent.tech / 123456

user@betalent.tech / 123456

Gateways:

Gateway1 (prioridade 1)

Gateway2 (prioridade 2)

Produtos:

Produto A - R$ 29,90

Produto B - R$ 39,90

Produto C - R$ 24,90

📁 Estrutura
text
app/
├── controllers/
├── models/
├── services/
├── validators/
database/
├── migrations/
├── seeders/
start/
├── routes.ts
📝 Minha experiência
Sobre o AdonisJS:
Nunca tinha ouvido falar antes do teste. Resolvi experimentar Node.js e gostei bastante da estrutura do framework.

Parte favorita:
Fazer o fallback dos gateways. Nunca tinha implementado algo assim e achei muito legal ver funcionando.

Dificuldades:
Quase desisti no começo. Só tinha visto vídeos de API em Java e Python, nunca tinha feito uma do zero. Pagamento parecia muito complexo. Foi totalmente fora da minha zona de conforto.

Quando funcionou:
Quando o token veio na resposta do login... sensação incrível! Depois a compra funcionar foi a cereja do bolo.

Conclusão:
Aprendi pra caramba, valeu cada minuto. Agora me sinto mais preparado pra próximos desafios.

Desenvolvido por Leonardo Delfino José
📅 Março/2026