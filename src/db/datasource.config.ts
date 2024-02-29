import { DataSource } from 'typeorm';

const dataSourceConfig = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Vinicius2014!',
  database: 'dolado',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/src/migrations/*{.ts,.js}'],
  synchronize: true,
});

export default dataSourceConfig;
