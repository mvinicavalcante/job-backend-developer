# TESTE DOLADO: API utilizando NestJS

Este é um projeto de API desenvolvido utilizando o framework NestJS. Ele inclui instruções para iniciar a API, criar migrações e rodar as migrações para configurar o banco de dados.

## Como usar

### Iniciar a API

Para iniciar a API, execute o seguinte comando:

npm run dev

Isso iniciará o servidor da API e estará pronto para aceitar solicitações.

### Criar migrações

Para criar migrações para o banco de dados, execute o seguinte comando:

typeorm migration:create ./src/migrations/NomeMigration

Substitua NomeMigration pelo nome desejado para a migração.

### Rodar migrações

Para executar as migrações e configurar o banco de dados, execute o seguinte comando:

npm run migration:run

Este comando executará as migrações especificadas no arquivo de configuração do TypeORM.
