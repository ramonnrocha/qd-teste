# Api

Quero Delivary style app.

## RFs (Requisitos funcionais)

- [ X ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível o usuário vizualizar um produto;
- [ ] Deve ser possível o usuário adicionar ao carrinho de compras;
- [ ] Deve ser possível o usuário finalizar a compra;
- [ ] Deve ser possível o usuário pode visualizar dados da sua compra;

## RNs (Regras de negócio)

- [ ] O usuário não pode fazer compras sem está logado;
- [ ] O usuário não pode vizualizar comprar sem está logado;
- [ ] O usuário não pode finalizar compras sem produtos;

## RNFs (Requisitos não-funcionais)

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco MongoDB;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);