# TESTE DOLADO: API utilizando NestJS

Este é um projeto de API desenvolvido utilizando o framework NestJS para o teste de desenvolvedor back-end na empresa Dolado.

## Impressões pessoais

* Desenvolvimento tranquilo com um framework no qual diariamente estou em contato. Raras exceções de algumas tecnologias que eu não possuía tanta familiaridade.
* As principais decisões tomadas se resumem basicamente às validações de criação tendo em vista a variedade de resultados que a API externa utilizada traria. Ex.: Quando o usuário digitar o nome de um filme que não for exatamente igual, sugerir relacionados aquele título.
* A estrutura do projeto facilita a manutenção da organização proposta pelo NestJS e conta com (src/): pasta config com a configuração para o Swagger; pasta db com configurações relacionadas ao banco de dados e TypeORM; pasta migrations para guardar as migrations; pasta modules com os módulos da aplicação (omdb e reviews) contendo seus services, controllers, repositories, dtos e arquivo(s) de teste.

## Como usar

### Antes de iniciar a API

Antes de iniciar a API, instale as dependências com o comando:
```bash
npm i
```
Defina o valor das variáveis de ambiente no .env

### Iniciar a API

Para iniciar a API a partir do Docker: instruções do Docker no final do arquivo

Para iniciar a API (sem Docker), execute o seguinte comando:

```bash
npm run dev
```

Isso iniciará o servidor da API e estará pronto para aceitar solicitações.

### Para ver a documentação da API:

localhost:SUA_PORTA/docs

* Lembre-se que sua porta irá depender se está rodando no Docker ou não. 
* Vale também citar que você pode modificar a porta na qual deseja que rode
indo nos arquivos .env de cada ambiente (Dockerfile, docker-compose e .env.production caso rode no Docker)

### Rodar testes da API

Para rodar os testes da API, execute os seguintes comandos:

* Testes unitários: 
```bash
  npm run test
```
* Testes de integração (e2e): 
```bash
npm run test:e2e
```

Isso iniciará os testes da API.

### Criar migrações

Para criar migrações para o banco de dados, execute o seguinte comando:

```bash
npm run migration:create ./src/migrations/NomeMigration
```

Substitua NomeMigration pelo nome desejado para a migração.

### Rodar migrações

Para executar as migrações e configurar o banco de dados, execute o seguinte comando:
```bash
npm run migration:run
```
Este comando executará as migrações especificadas no arquivo de configuração do TypeORM.

### Rodar container Docker

## Antes de rodar o Docker...

* Certifique-se que as portas definidas estarão livres.
* Defina os valores das variáveis definidas no .env.production

## Buildar API
```bash
docker compose build
```

## Subir o container
```bash
docker compose up
