import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertAdmin1730201080123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        insert into "user" ("name", "email", "phone", "password", "role")
        values ('admin', 'admin@gmail.com', '0359984838', '$2b$10$fvoRust5zlJR5pYQP79MpuA63BVatpJO8roqonmtfZpueWak6P/w6', 'ADMIN')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        delete from "user" where "email" = 'admin@gmail.com'
    `);
  }
}
