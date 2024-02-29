import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateReview1709170559669 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "review" (
            "id" int NOT NULL AUTO_INCREMENT,
            "title" varchar(255) NOT NULL,
            "notes" varchar(255) NOT NULL,
            "rating" int NOT NULL,
            "released" date NOT NULL,
            PRIMARY KEY ("id")
        ) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "review"`);
  }
}
