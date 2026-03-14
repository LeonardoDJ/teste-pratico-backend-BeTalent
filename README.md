# API de pagamentos desenvolvida para o teste prático da BeTalent. Nível 1 concluído.

## Sobre o projeto
Este projeto foi desenvolvido como parte do teste prático da BeTalent para vaga de desenvolvedor back-end. O desafio era criar uma API de pagamentos que simulasse um cenário real, integrando com dois gateways diferentes.

## Como funciona:
1. O cliente faz uma compra informando o produto e os dados do cartão
2. O sistema tenta processar o pagamento no Gateway 1 (prioridade mais alta)
3. Se o Gateway 1 falhar (erro ou recusa), o sistema tenta automaticamente no Gateway 2
4. Se os dois falharem, aí sim retorna erro

## Tecnologias
![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![AdonisJS](https://img.shields.io/badge/AdonisJS-6.x-purple)
![MySQL](https://img.shields.io/badge/MySQL-8.x-blue)
![Docker](https://img.shields.io/badge/Docker-✔️-blue)
![Postman](https://img.shields.io/badge/Postman-FF6C37)
![Lucid ORM](https://img.shields.io/badge/Lucid_ORM-ORM-8B5CF6)
![VineJS](https://img.shields.io/badge/VineJS-Validação-10b981)
![Status](https://img.shields.io/badge/Status-Concluído-brightgreen)
## Tempo de desenvolvimento
Levei cerca de 2 dia inteiro pra fazer o Nível 1.
Como não estou trabalhando no momento, consegui focar bastante no teste.

# Como rodar?

## 1. Clone o repositório
git clone https://github.com/LeonardoDJ/teste-pratico-backend-BeTalent.git
cd teste-pratico-backend-BeTalent

## 2. Instale as dependências
npm install

## 3. Configure o banco MySQL 
- crie um banco com o nome: betalent_payment
- Copie .env.example para .env e ajuste as credenciais
- Ajuste as credenciais no .env (usuário, senha, etc)

## 4. Rode as migrations e seeders (cria as tabelas)
node ace migration:run
node ace db:seed

## 5. Rode os seeders (popula o banco com dados iniciais)
node ace db:seed

## 6. Inicie os gateways mock (precisa do Docker instalado)
docker run -p 3001:3001 -p 3002:3002 -e REMOVE_AUTH='true' matheusprotzen/gateways-mock

## 7. Inicie o servidor
npm run dev
A API roda em http://localhost:3333

# 🔐 Como testar no Postman

## Passo 1: FAzer login e pegar o token
1. Abra o Postman e clique em "New" > "HTTP Request"
2. Configure a requisição:
  -Método: POST
  -URL: http://localhost:3333/login
3. Vá na aba "Body"
  - Selecione "raw"
  - No lado direito, escolha "JSON"
4. Digite o corpo da requisição:
{
  "email": "admin@betalent.tech",
  "password": "123456"
}
5. Clique em "Send"
### Resposta esperada:
```
{
  "token": "oat_MTIzNDU2Nzg5MCF6bgk2I1BhdGF0YSBjb21",
  "usuario": {
    "id": 1,
    "nome": "Administrador",
    "email": "admin@betalent.tech",
    "cargo": "ADMIN"
  }
}
```
Guarde esse token! Você vai usar nos próximos passos.

## Passo 2: Testar uma rota pública (sem token)
Vamos testar uma compra direto, sem precisar de token:

1. Crie uma nova requisição (Ctrl + N)
2. Configure:
   -Método: Post
   -URL: http://localhost:3333/comprar
3. Aba Body
   -raw + JSON
4. Digite:
```
{
  "product_id": 1,
  "name": "João Silva",
  "email": "joao@email.com",
  "card_number": "5569000000006063",
  "cvv": "010"
}
```
5. Clique em "Send"
### Resposta esperada:
```
{
  "mensagem": "Compra realizada com sucesso!",
  "transacao": {
    "id": 1,
    "status": "paid",
    "valor": 2990,
    "cartaoFinal": "6063"
  }
}
```
## Passo 3: Listar produtos (rota privada)
Agora vamos testar uma rota que precisa de autenticação usando o token que você copiou no Passo 1.
1. Crie uma nova requisição (Ctrl + N)
2. Configure:
   -Método: GET
   -URL: http://localhost:3333/products
3. Vá na aba "Headers" e adicione:
   -Key: Authorization
   -Value: Bearer SEU_TOKEN_AQUI
(substitua SEU_TOKEN_AQUI pelo token que você copiou lá no Passo 1 quando fez o login)

5. Clique em "Send"
### Resposta esperada:
```
[
  {
    "id": 1,
    "name": "Produto A",
    "amount": 2990,
    "createdAt": "2026-03-13T...",
    "updatedAt": "2026-03-13T..."
  },
  {
    "id": 2,
    "name": "Produto B",
    "amount": 3990,
    "createdAt": "...",
    "updatedAt": "..."
  },
  {
    "id": 3,
    "name": "Produto C",
    "amount": 2490,
    "createdAt": "...",
    "updatedAt": "..."
  }
]
```
## passo 4: Criar um novo produto (rota privada)
Vamos adicionar um produto novo no sistema:
1. Crie uma nova requisição
2. Configure:
   -Método: POST
   -URL: http://localhost:3333/products
3. Aba Headers:
   -Key: Authorization
   -Value: Bearer SEU_TOKEN_AQUI

4. Aba Body (raw + JSON):
```
{
  "name": "Produto D",
  "amount": 4990
}
```
5. Clique em "Send"
### Resposta esperada:
```
{
  "id": 4,
  "name": "Produto D",
    "amount": 4990,
  "createdAt": "...",
  "updatedAt": "..."
}
```

# 📍 Rotas da API
## Públicas (não precisam de token)
- POST /login - Faz o login
- POST /comprar - Realizar uma compra

## Privadas (token)
- GET /gateways - Lista todos os gateways
- PUT /gateways/:id/toggle - Ativar/desativar um gateway
- PUT /gateways/:id/priority - Alterar prioridade do gateway
- GET /products - Listar produtos
- POST /products - Criar um novo produto
- GET /products/:id - Visualiza um produto
- PUT /products/:id - Atualizar um produto
- DELETE /products/:id - Deletar um produto
- GET /clientes - Lista todos os clientes
- GET /clientes/:id - Ver cliente + compras
- GET /transacoes - Lista todas as transações
- GET /transacoes/:id - Ver detalhes de uma transação
- POST /logout - Fazer logout










# 💰 Exemplo de compra
json
```
POST /comprar
{
  "product_id": 1,
  "name": "João Silva",
  "email": "joao@email.com",
  "card_number": "5569000000006063",
  "cvv": "010"
}
```
Resposta:
json
```
{
  "mensagem": "Compra realizada com sucesso!",
  "transacao": {
    "id": 1,
    "status": "paid",
    "valor": 2990,
    "cartaoFinal": "6063"
  }
}
```
Observação: O valor está em centavos (2990 = R$ 29,90)

# Testando fallback
- Gateway 1 falha com CVV 100 ou 200
- Gateway 2 falha com CVV 200 ou 300
Exemplo: Se você usar cvv: 100, o Gateway 1 recusa e o sistema tenta automaticamente no Gateway 2.

## Dados iniciais (seeders)
### Usuários:
- email: admin@betalent.tech / senha: 123456
- email: user@betalent.tech / senha: 123456

### Gateways:
- Gateway1 (prioridade 1)
- Gateway2 (prioridade 2)

### Produtos:
- Produto A - R$ 29,90
- Produto B - R$ 39,90
- Produto C - R$ 24,90

# Estrutura
```
app/
├── controllers/ # Lógica das rotas
├── models/      # Representação das tabelas
├── services/    # Regras de negócio (gateways, pagamentos)
├── validators/  # Validação dos dados
database/
├── migrations/  # Criação das tabelas
├── seeders/     # Dados iniciais
start/    
├── routes.ts    # Todas as rotas da API
```
# Minha experiência
## Sobre o AdonisJS:
Eu nunca tinha ouvido falar do AdonisJS antes desse teste. Sempre via a galera falando de Node.js mas nunca tinha mexido. Quis experimentar algo novo e confesso que gostei bastante de trabalhar com ele. Achei a estrutura organizada e faz sentido depois que você entende.

## A parte que mais gostei:
Foi fazer o fallback dos gateways. Nunca tinha feito nada parecido, de um sistema tentar uma coisa e se não der certo tentar outra automaticamente. Quando vi funcionando pela primeira vez, mandei um CVV que dava erro no primeiro gateway e ele foi pro segundo e deu certo, achei muito legal. Parece mágica mas é código kkkk

## Quase desisti:
Logo no começo quase desisti, sério. Olhei o tanto de coisa que tinha que fazer e pensei "nunca vou conseguir". Eu só tinha visto vídeos de API em Java e Python, mas nunca tinha feito uma do zero. Pagamento então, nem se fala, parecia muito complexo. Foi totalmente fora da minha zona de conforto.

## Quando funcionou:
Quando finalmente consegui fazer o login funcionar e veio o token... nossa, que sensação boa! Depois quando a compra deu certo, aí sim fiquei feliz demais. Ver algo que você fez funcionando, ainda mais com tecnologia nova, é muito gratificante.

## O que aprendi:
Aprendi muita coisa durante esse teste, principalmente como seria trabalhar na área que eu quero. Confesso que usei bastante IA pra me ajudar, principalmente na hora dos códigos, porque nunca tinha feito uma API de pagamento e muito menos usando Node.js. A IA me ajudou a entender conceitos, corrigir erros e me mostrar caminhos, mas quem tava no controle era eu, testando, quebrando cabeça e vendo o que funcionava.

## O que preciso melhorar:
Percebi que tenho que estudar mais sobre APIs, como deixar elas mais organizadas, mais seguras e com código mais limpo. Também quero aprender sobre testes automatizados, documentação melhor e como estruturar projetos maiores. Esse teste me mostrou na prática o que eu preciso estudar daqui pra frente.

## No geral:
Foi um desafio enorme, aprendi pra caramba e no final valeu cada minuto. Agora me sinto mais preparado pra encarar outros projetos e mais perto de alcançar meu objetivo de trabalhar na área.

# Desenvolvido por Leonardo Delfino José
📅 Março/2026
