# Api

Quero Delivary style app.

## RFs (Requisitos funcionais)

- [ X ] Deve ser possível se cadastrar;
- [ X ] Deve ser possível se autenticar;
- [ X ] Deve ser possível o usuário vizualizar um produto;
- [ X ] Deve ser possível o usuário um produto adicionar ao carrinho de compras;
- [ X ] Deve ser possível o usuário finalizar a compra;
- [ X ] Deve ser possível o usuário pode visualizar dados da sua compra;

## RNs (Regras de negócio)

- [ X ] O usuário não pode fazer compras sem está logado;
- [ X ] O usuário não pode vizualizar comprar sem está logado;S
- [ X ] O usuário não pode finalizar compras sem produtos;

## RNFs (Requisitos não-funcionais)

- [ X ] A senha do usuário precisa estar criptografada;
- [ X ] O usuário deve ser identificado por um JWT (JSON Web Token);

## Setup Necessário

- Docker
- Node version ">=20"
- NPM

## Iniciar 
- Defina as Variaveis de ambiente segundo o arquivo ".env.exemple"
- Digite no terminal "npm install"
- Inicialize o banco de dados com o docker "docker compose up -d"
- Inicialize o prisma "npx prisma generate"
- Rode as migrations "npx prisma migrate dev"
- Start o projeto em densevolvimento "npm run dev"

## TESTES

- Rode os testes unitário com  "npm run test"
