import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
dotenv.config();

const dataSourceConfig = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(
    process.env.ENVIROMENT === 'development'
      ? process.env.DB_PORT_LOCAL
      : process.env.DB_PORT_PRODUCTION,
  ),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize: true,
  migrationsRun: true,
  migrationsTableName: 'migrations_TypeORM',
  migrationsTransactionMode: 'all',
});

export default dataSourceConfig;
