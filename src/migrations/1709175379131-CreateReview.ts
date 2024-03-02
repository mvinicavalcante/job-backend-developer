import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateReview1709175379131 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* SQL */ `CREATE TABLE "review" (
            "id" int NOT NULL AUTO_INCREMENT,
            "title" varchar(255) NOT NULL,
            "notes" varchar(255) NOT NULL,
            "rating" int NOT NULL,
            "released" date NOT NULL,
            "runtime" varchar(10) NOT NULL,
            "director" varchar(150) NOT NULL,
            "genre" varchar(200) NOT NULL,
            "actors" varchar(255) NOT NULL,
            PRIMARY KEY ("id")
        ) ENGINE=InnoDB`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "review"`);
  }
}
