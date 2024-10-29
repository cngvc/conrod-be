import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRole1730198893692 implements MigrationInterface {
    name = 'AddRole1730198893692'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."role_enum" AS ENUM('ADMIN', 'MANAGER', 'USER')
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "role" "public"."role_enum" NOT NULL DEFAULT 'USER'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "role"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."role_enum"
        `);
    }

}
