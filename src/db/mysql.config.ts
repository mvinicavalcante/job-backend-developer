import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  database: 'dolado',
  username: 'root',
  password: 'Vinicius2014!',
  entities: ['dist/**/*.entity{ .ts,.js}'],
  migrations: ['dist/src/migrations/*{.ts,.js}'],
  synchronize: true,
  migrationsRun: true,
  migrationsTableName: 'migrations_TypeORM',
  migrationsTransactionMode: 'all',
};
