import { MigrationInterface, QueryRunner, Table, TableIndex, TableColumn, TableForeignKey } from "typeorm";

export class PostRefactoring1602063888238 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.createTable(new Table({
        //     name: "question",
        //     columns: [
        //         {
        //             name: "id",
        //             type: "int",
        //             isPrimary: true
        //         },
        //         {
        //             name: "name",
        //             type: "varchar",
        //         }
        //     ]
        // }), true)

        // await queryRunner.createIndex("question", new TableIndex({
        //     name: "IDX_QUESTION_NAME",
        //     columnNames: ["name"]
        // }));

        await queryRunner.createTable(new Table({
            name: "accounts",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "code",
                    type: "varchar",
                },
                {
                    name: 'status',
                    type: 'varchar',
                },
                {
                    name: 'fiscal_year',
                    type: 'varchar',
                },
                {
                    name: 'description',
                    type: 'varchar',
                },
                {
                    name: 'type',
                    type: 'varchar',
                },
                {
                    name: 'restriction',
                    type: 'varchar',
                },
                {
                    name: 'end_year_adjustment_budget',
                    type: 'varchar',
                },
                {
                    name: 'is_subaccount',
                    type: 'varchar',
                },
                {
                    name: 'parent_id',
                    type: 'varchar',
                },
                {
                    name: 'company_id',
                    type: 'varchar',
                },
                {
                    name: 'is_posted',
                    type: 'varchar',
                },
                {
                    name: 'restriction_sub_type',
                    type: 'varchar',
                },
            ]
        }), true);

        await queryRunner.query(`INSERT INTO public.accounts (id, code, status, fiscal_year, description, type, restriction, end_year_adjustment_budget, is_subaccount, parent_id, company_id, is_posted, restriction_sub_type) VALUES (14, 'G30', 0, 2019, 'G30', 'l', 'njt', 'null', false, 2, 2, false, 2);`)
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("accounts");
        // await queryRunner.dropTable("question");
    }


}
