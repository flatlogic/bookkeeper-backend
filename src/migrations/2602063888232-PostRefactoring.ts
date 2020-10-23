import { MigrationInterface, QueryRunner, Table, TableIndex, TableUnique, TableForeignKey } from "typeorm";

export class PostRefactoring2602063888232 implements MigrationInterface {
    
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "accounts",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                },
                {
                    name: "code",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: 'status',
                    type: 'integer',
                    default: 1,
                },
                {
                    name: 'fiscal_year',
                    type: 'integer',
                    isNullable: true
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'type',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'restriction',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'end_year_adjustment_budget',
                    type: 'numeric',
                    precision: 5,
                    scale: 2,
                    default: 1,
                    isNullable: true
                },
                {
                    name: 'is_subaccount',
                    type: 'boolean',
                    default: false,
                    isNullable: true
                },
                {
                    name: 'parent_id',
                    type: 'int',
                    isNullable: true
                },
                {
                    name: 'company_id',
                    type: 'int',
                    isNullable: true
                },
                {
                    name: 'is_posted',
                    type: 'boolean',
                    default: false,
                    isNullable: true
                },
                {
                    name: 'restriction_sub_type',
                    type: 'varchar',
                    isNullable: true
                },
            ]
        }), true);

        const accountsUniqueConstraint = new TableUnique({ columnNames: ["code", "fiscal_year"] });

        await queryRunner.createUniqueConstraint("accounts", accountsUniqueConstraint);

        await queryRunner.createTable(new Table({
            name: "address",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                },
                {
                    name: "street",
                    type: "varchar",
                },
                {
                    name: 'city',
                    type: 'varchar',
                },
                {
                    name: 'state',
                    type: 'varchar',
                },
                {
                    name: 'zip_code',
                    type: 'varchar',
                },
                {
                    name: 'phone',
                    type: 'varchar',
                    isNullable: true
                },
            ]
        }), true);

        await queryRunner.createTable(new Table({
            name: "addresses",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                },
                {
                    name: "street",
                    type: "varchar",
                },
                {
                    name: 'city',
                    type: 'varchar',
                },
                {
                    name: 'state',
                    type: 'varchar',
                },
                {
                    name: 'zip_code',
                    type: 'varchar',
                },
                {
                    name: 'phone',
                    type: 'varchar',
                    isNullable: true
                },
            ]
        }), true);


        await queryRunner.createTable(new Table({
            name: "companies",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                },
                {
                    name: "code",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: 'status',
                    type: 'int',
                    default: 1,
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'license_number',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'default_withholding_state_code',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'default_withholding_local1_code',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'default_withholding_local2_code',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'is_multiple_local_taxation',
                    type: 'boolean',
                    default: false,
                    isNullable: true,
                },
                {
                    name: 'organizationId',
                    type: 'integer',
                    isNullable: true
                },
                {
                    name: 'is_deleted',
                    type: 'boolean',
                    default: false
                },
                {
                    name: 'physicalAddressId',
                    type: 'integer',
                    isNullable: true,
                },
                {
                    name: 'mailingAddressId',
                    type: 'integer',
                    isNullable: true,
                },
                {
                    name: 'country',
                    type: 'varchar',
                    isNullable: true,
                }
            ]
        }), true);

        await queryRunner.createForeignKey("accounts", new TableForeignKey({
            columnNames: ["parent_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "accounts",
            onDelete: 'CASCADE',
        }));

        await queryRunner.createForeignKey("accounts", new TableForeignKey({
            columnNames: ["company_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "companies",
            onDelete: 'CASCADE',
        }));

        await queryRunner.createTable(new Table({
            name: "organizations",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: 'is_deleted',
                    type: 'boolean',
                    default: false
                },
                {
                    name: 'status',
                    type: 'int',
                    default: 1
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'physicalAddressId',
                    type: 'int',
                    isNullable: true
                },
                {
                    name: 'mailingAddressId',
                    type: 'int',
                    isNullable: true
                }
            ],
        }), true);

        await queryRunner.createForeignKey("organizations", new TableForeignKey({
            columnNames: ["physicalAddressId"],
            referencedColumnNames: ["id"],
            referencedTableName: "addresses",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("organizations", new TableForeignKey({
            columnNames: ["mailingAddressId"],
            referencedColumnNames: ["id"],
            referencedTableName: "addresses",
            onDelete: "CASCADE"
        }));

        const organizationsUniqueConstraint = new TableUnique({ columnNames: ["name", "physicalAddressId", "mailingAddressId"] });

        await queryRunner.createUniqueConstraint("organizations", organizationsUniqueConstraint);

        await queryRunner.createForeignKey("companies", new TableForeignKey({
            columnNames: ["organizationId"],
            referencedColumnNames: ["id"],
            referencedTableName: "organizations",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("companies", new TableForeignKey({
            columnNames: ["physicalAddressId"],
            referencedColumnNames: ["id"],
            referencedTableName: "addresses",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("companies", new TableForeignKey({
            columnNames: ["mailingAddressId"],
            referencedColumnNames: ["id"],
            referencedTableName: "addresses",
            onDelete: "CASCADE"
        }));

        const companiesUniqueConstraint = new TableUnique({ columnNames: ["code", "physicalAddressId", "mailingAddressId"] });

        await queryRunner.createUniqueConstraint("companies", companiesUniqueConstraint);

        await queryRunner.createTable(new Table({
            name: "customers",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: "code",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: 'status',
                    type: 'integer',
                    default: 1,
                },
                {
                    name: 'address',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'contact_person',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'invoice_terms_message',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'current_year_billings',
                    type: 'numeric',
                    precision: 15,
                    scale: 2,
                    default: 1,
                    isNullable: true
                },
                {
                    name: 'last_year_billings',
                    type: 'numeric',
                    precision: 15,
                    scale: 2,
                    default: 1,
                    isNullable: true
                },
                {
                    name: 'default_sales_tax_rate',
                    type: 'numeric',
                    precision: 15,
                    scale: 2,
                    default: 1,
                    isNullable: true
                },
                {
                    name: 'default_sales_tax_state_code',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'default_sales_tax_district_code',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'this_year_billings',
                    type: 'numeric',
                    precision: 15,
                    scale: 2,
                    default: 1,
                    isNullable: true
                },
                {
                    name: 'to_date_billings',
                    type: 'numeric',
                    precision: 15,
                    scale: 2,
                    default: 1,
                    isNullable: true
                },
                {
                    name: 'is_exempt_for_late_fee',
                    type: 'boolean',
                    default: false,
                    isNullable: true
                },
                {
                    name: 'contact_email',
                    type: 'varchar',
                },
                {
                    name: 'is_print_statements',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'physicalAddressId',
                    type: 'int',
                    isNullable: true
                },
                {
                    name: 'mailingAddressId',
                    type: 'int',
                    isNullable: true
                },
                {
                    name: 'company',
                    type: 'int',
                    isNullable: true
                },
                {
                    name: 'default_account_id',
                    type: 'int',
                    isNullable: true
                },
                {
                    name: 'default_sub_account_id',
                    type: 'int',
                    isNullable: true
                },
                {
                    name: 'last_payment_date',
                    type: 'timestamp',
                    isNullable: true
                }
            ]
        }), true);

        await queryRunner.createForeignKey("customers", new TableForeignKey({
            columnNames: ["physicalAddressId"],
            referencedColumnNames: ["id"],
            referencedTableName: "addresses",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("customers", new TableForeignKey({
            columnNames: ["mailingAddressId"],
            referencedColumnNames: ["id"],
            referencedTableName: "addresses",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("customers", new TableForeignKey({
            columnNames: ["company"],
            referencedColumnNames: ["id"],
            referencedTableName: "companies",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("customers", new TableForeignKey({
            columnNames: ["default_account_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "accounts",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("customers", new TableForeignKey({
            columnNames: ["default_sub_account_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "accounts",
            onDelete: "CASCADE"
        }));

        const customersUniqueConstraint = new TableUnique({ columnNames: ["physicalAddressId", "mailingAddressId"] });

        await queryRunner.createUniqueConstraint("customers", customersUniqueConstraint);

        await queryRunner.createTable(new Table({
            name: "employees",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                },
                {
                    name: 'city',
                    type: 'varchar'
                },
                {
                    name: 'zip_code',
                    type: 'varchar',
                },
                {
                    name: 'zip_code_ext',
                    type: 'varchar',
                },
                {
                    name: 'tel_area_code',
                    type: 'int',
                },
                {
                    name: 'tel_prefix',
                    type: 'int',
                },
                {
                    name: 'tel_number',
                    type: 'int',
                },
                {
                    name: 'license_number',
                    type: 'varchar',
                },
                {
                    name: 'fax_area_code',
                    type: 'int',
                },
                {
                    name: 'fax_prefix',
                    type: 'int',
                },
                {
                    name: 'fax_number',
                    type: 'varchar',
                },
                {
                    name: 'code',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'status',
                    type: 'varchar',
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'addressLine1',
                    type: 'varchar',
                },
                {
                    name: 'addressLine2',
                    type: 'varchar',
                },
                {
                    name: 'ssn',
                    type: 'varchar',
                },
                {
                    name: 'minority',
                    type: 'varchar',
                },
                {
                    name: 'gender',
                    type: 'varchar',
                },
                {
                    name: 'has_pension_plan',
                    type: 'boolean',
                },
                {
                    name: 'birthday',
                    type: 'date',
                },
                {
                    name: 'hire_date',
                    type: 'date',
                },
                {
                    name: 'termination_date',
                    type: 'date',
                },
                {
                    name: 'rehire_date',
                    type: 'date',
                },
                {
                    name: 'other_date',
                    type: 'date',
                },
                {
                    name: 'state_withholding_code',
                    type: 'varchar',
                },
                {
                    name: 'payment_frequency',
                    type: 'varchar',
                },
                {
                    name: 'is_excluded_certified_payroll',
                    type: 'boolean',
                },
                {
                    name: 'federal_withholding_allowances',
                    type: 'int',
                },
                {
                    name: 'federal_withholding_tax_adjustment',
                    type: 'varchar',
                },
                {
                    name: 'federal_withholding_tax_amount',
                    type: 'numeric',
                    precision: 15,
                    scale: 2,
                    default: 1,
                    isNullable: true
                },
                {
                    name: 'salary_amount',
                    type: 'numeric',
                    precision: 15,
                    scale: 2,
                    default: 1,
                    isNullable: true
                },
                {
                    name: 'print_details_check_stub',
                    type: 'boolean',
                },
                {
                    name: 'driver_license',
                    type: 'varchar',
                },
                {
                    name: 'work_permit',
                    type: 'varchar',
                },
                {
                    name: 'work_permit_expire_date',
                    type: 'date',
                },
                {
                    name: 'is_union_job_override_allowed',
                    type: 'boolean',
                },
                {
                    name: 'is_work_comp_job_override_allowed',
                    type: 'boolean',
                },
                {
                    name: 'is_general_liability_job_override_allowed',
                    type: 'boolean',
                },
                {
                    name: 'last_check_date',
                    type: 'date',
                },
                {
                    name: 'department',
                    type: 'varchar',
                },
                {
                    name: 'default_cost',
                    type: 'varchar',
                },
                {
                    name: 'default_phase',
                    type: 'varchar',
                },
                {
                    name: 'default_job',
                    type: 'varchar',
                },
                {
                    name: 'union_code',
                    type: 'varchar',
                },
                {
                    name: 'general_liability_code',
                    type: 'varchar',
                },
                {
                    name: 'worker_comp_code',
                    type: 'varchar',
                },
                {
                    name: 'accountId',
                    type: 'int',
                    isNullable: true
                },
                {
                    name: 'subAccountId',
                    type: 'int',
                    isNullable: true
                },
                {
                    name: 'state_sui_sdi_code',
                    type: 'varchar',
                },
                {
                    name: 'local_taxes_code',
                    type: 'varchar',
                },
                {
                    name: 'tel_area_code_2',
                    type: 'int',
                },
                {
                    name: 'tel_prefix_2',
                    type: 'int',
                },
                {
                    name: 'tel_number_2',
                    type: 'int',
                },
                {
                    name: 'craft_code',
                    type: 'varchar',
                },
                {
                    name: 'federal_status',
                    type: 'varchar',
                },
                {
                    name: 'is_deleted',
                    type: 'boolean',
                    default: false
                }
            ]
        }), true);

        await queryRunner.createForeignKey("employees", new TableForeignKey({
            columnNames: ["accountId"],
            referencedColumnNames: ["id"],
            referencedTableName: "accounts",
        }));

        await queryRunner.createForeignKey("employees", new TableForeignKey({
            columnNames: ["subAccountId"],
            referencedColumnNames: ["id"],
            referencedTableName: "accounts",
        }));

        await queryRunner.createTable(new Table({
            name: "general_ledger",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                },
                {
                    name: 'period_1_status',
                    type: 'int',
                },
                {
                    name: 'period_2_status',
                    type: 'int',
                },
                {
                    name: 'period_3_status',
                    type: 'int',
                },
                {
                    name: 'period_4_status',
                    type: 'int',
                },
                {
                    name: 'period_5_status',
                    type: 'int',
                },
                {
                    name: 'period_6_status',
                    type: 'int',
                },
                {
                    name: 'period_7_status',
                    type: 'int',
                },
                {
                    name: 'period_8_status',
                    type: 'int',
                },
                {
                    name: 'period_9_status',
                    type: 'int',
                },
                {
                    name: 'period_10_status',
                    type: 'int',
                },
                {
                    name: 'period_11_status',
                    type: 'int',
                },
                {
                    name: 'period_12_status',
                    type: 'int',
                },
                {
                    name: 'current_fiscal_year',
                    type: 'int',
                },
                {
                    name: 'is_prior_fiscal_year_closed',
                    type: 'boolean',
                },
                {
                    name: 'current_fiscal_year_opened',
                    type: 'date',
                },
                {
                    name: 'current_bank_balance',
                    type: 'numeric',
                    precision: 5,
                    scale: 2,
                    default: 1,
                    isNullable: true
                },
                {
                    name: 'retainedEarningsAccountId',
                    type: 'int',
                    isNullable: true
                },
                {
                    name: 'retainedEarningsSubAccountId',
                    type: 'int',
                    isNullable: true
                },
                {
                    name: 'companyId',
                    type: 'int',
                    isNullable: true
                },
                {
                    name: 'calendar_year_period_1',
                    type: 'int',
                    isNullable: true
                },
                {
                    name: 'period_1_month',
                    type: 'varchar',
                },
                {
                    name: 'period_2_month',
                    type: 'varchar',
                },
                {
                    name: 'period_3_month',
                    type: 'varchar',
                },
                {
                    name: 'period_4_month',
                    type: 'varchar',
                },
                {
                    name: 'period_5_month',
                    type: 'varchar',
                },
                {
                    name: 'period_6_month',
                    type: 'varchar',
                },
                {
                    name: 'period_7_month',
                    type: 'varchar',
                },
                {
                    name: 'period_8_month',
                    type: 'varchar',
                },
                {
                    name: 'period_9_month',
                    type: 'varchar',
                },
                {
                    name: 'period_10_month',
                    type: 'varchar',
                },
                {
                    name: 'period_11_month',
                    type: 'varchar',
                },
                {
                    name: 'period_12_month',
                    type: 'varchar',
                },
                {
                    name: 'last_journal_posted',
                    type: 'int',
                    isNullable: true
                },
                {
                    name: 'last_fiscal_year_posted',
                    type: 'int',
                    isNullable: true
                },
                {
                    name: 'last_fiscal_period_posted',
                    type: 'int',
                    isNullable: true
                },
                {
                    name: 'last_fiscal_year_balance_posted',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'reconciliation_date',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'calYearOf1stPerOfFiscalYear',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'company_id',
                    type: 'int',
                    isNullable: true
                }
            ]
        }), true);

        
        await queryRunner.createForeignKey("general_ledger", new TableForeignKey({
            columnNames: ["retainedEarningsAccountId"],
            referencedColumnNames: ["id"],
            referencedTableName: "accounts",
        }));

        await queryRunner.createForeignKey("general_ledger", new TableForeignKey({
            columnNames: ["retainedEarningsSubAccountId"],
            referencedColumnNames: ["id"],
            referencedTableName: "accounts",
        }));

        await queryRunner.createForeignKey("general_ledger", new TableForeignKey({
            columnNames: ["companyId"],
            referencedColumnNames: ["id"],
            referencedTableName: "companies",
        }));

        const general_ledgerUniqueConstraint = new TableUnique({ columnNames: ["companyId", "current_fiscal_year"] });

        await queryRunner.createUniqueConstraint("general_ledger", general_ledgerUniqueConstraint);

        await queryRunner.createTable(new Table({
            name: "general_ledger_accounts_budget",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                },
                {
                    name: 'period_1_budget',
                    type: 'numeric',
                    precision: 20,
                    scale: 2,
                    default: 1,
                    isNullable: true
                },
                {
                    name: 'period_2_budget',
                    type: 'numeric',
                    precision: 20,
                    scale: 2,
                    default: 1,
                    isNullable: true
                },
                {
                    name: 'period_3_budget',
                    type: 'numeric',
                    precision: 20,
                    scale: 2,
                    default: 1,
                    isNullable: true
                },
                {
                    name: 'period_4_budget',
                    type: 'numeric',
                    precision: 20,
                    scale: 2,
                    default: 1,
                    isNullable: true
                },
                {
                    name: 'period_5_budget',
                    type: 'numeric',
                    precision: 20,
                    scale: 2,
                    default: 1,
                    isNullable: true
                },
                {
                    name: 'period_6_budget',
                    type: 'numeric',
                    precision: 20,
                    scale: 2,
                    default: 1,
                    isNullable: true
                },
                {
                    name: 'period_7_budget',
                    type: 'numeric',
                    precision: 20,
                    scale: 2,
                    default: 1,
                    isNullable: true
                },
                {
                    name: 'period_8_budget',
                    type: 'numeric',
                    precision: 20,
                    scale: 2,
                    default: 1,
                    isNullable: true
                },
                {
                    name: 'period_9_budget',
                    type: 'numeric',
                    precision: 20,
                    scale: 2,
                    default: 1,
                    isNullable: true
                },
                {
                    name: 'period_10_budget',
                    type: 'numeric',
                    precision: 20,
                    scale: 2,
                    default: 1,
                    isNullable: true
                },
                {
                    name: 'period_11_budget',
                    type: 'numeric',
                    precision: 20,
                    scale: 2,
                    default: 1,
                    isNullable: true
                },
                {
                    name: 'period_12_budget',
                    type: 'numeric',
                    precision: 20,
                    scale: 2,
                    default: 1,
                    isNullable: true
                },
                {
                    name: 'accountId',
                    type: 'int',
                    isNullable: true
                },
                {
                    name: 'generalLedgerId',
                    type: 'int',
                    isNullable: true
                }
            ]
        }), true);

        
        await queryRunner.createForeignKey("general_ledger_accounts_budget", new TableForeignKey({
            columnNames: ["accountId"],
            referencedColumnNames: ["id"],
            referencedTableName: "accounts",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("general_ledger_accounts_budget", new TableForeignKey({
            columnNames: ["generalLedgerId"],
            referencedColumnNames: ["id"],
            referencedTableName: "general_ledger",
        }));

        const general_ledger_accounts_budgetUniqueConstraint = new TableUnique({ columnNames: ["accountId", "generalLedgerId"] });

        await queryRunner.createUniqueConstraint("general_ledger_accounts_budget", general_ledger_accounts_budgetUniqueConstraint);
        
        await queryRunner.createTable(new Table({
            name: "gl_periods",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                },
                {
                    name: "name",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: 'number',
                    type: 'int',
                    isNullable: true
                },
                {
                    name: 'fiscal_year',
                    type: 'int',
                    isNullable: true
                }
            ]
        }), true);



        const gl_periodsUniqueConstraint = new TableUnique({ columnNames: ["number", "fiscal_year"] });

        await queryRunner.createUniqueConstraint("gl_periods", gl_periodsUniqueConstraint);

        await queryRunner.createTable(new Table({
            name: "roles",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: 'description',
                    type: 'varchar',
                },
                {
                    name: 'organizationId',
                    type: 'int',
                    isNullable: true
                },
                {
                    name: 'p_general_ledger',
                    type: 'text[]',
                    isNullable: true
                },
                {
                    name: 'p_job_cost',
                    type: 'text[]',
                    isNullable: true
                }
            ]
        }), true);

        await queryRunner.createForeignKey("roles", new TableForeignKey({
            columnNames: ["organizationId"],
            referencedColumnNames: ["id"],
            referencedTableName: "organizations",
            onDelete: "CASCADE"
        }));

        const rolesUniqueConstraint = new TableUnique({ columnNames: ["name", "organizationId"] });

        await queryRunner.createUniqueConstraint("roles", rolesUniqueConstraint);

        await queryRunner.createTable(new Table({
            name: "raw_general_ledger",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                },
                {
                    name: "value",
                    type: "jsonb",
                    isNullable: true
                },
                {
                    name: 'relation',
                    type: 'int',
                    isNullable: true
                }
            ]
        }), true);

        await queryRunner.createForeignKey("raw_general_ledger", new TableForeignKey({
            columnNames: ["relation"],
            referencedColumnNames: ["id"],
            referencedTableName: "general_ledger",
        }));

        const raw_general_ledgerUniqueConstraint = new TableUnique({ columnNames: ["relation"] });

        await queryRunner.createUniqueConstraint("raw_general_ledger", raw_general_ledgerUniqueConstraint);

        await queryRunner.createTable(new Table({
            name: "raw_accounts",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                },
                {
                    name: 'value',
                    type: 'jsonb',
                    isNullable: true
                },
                {
                    name: 'relation',
                    type: 'int',
                    isNullable: true
                }
            ]
        }), true);

        await queryRunner.createForeignKey("raw_accounts", new TableForeignKey({
            columnNames: ["relation"],
            referencedColumnNames: ["id"],
            referencedTableName: "accounts",
        }));

        const raw_accountsUniqueConstraint = new TableUnique({ columnNames: ["relation"] });

        await queryRunner.createUniqueConstraint("raw_accounts", raw_accountsUniqueConstraint);

        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                },
                {
                    name: 'username',
                    type: 'varchar',
                },
                {
                    name: 'password',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'is_deleted',
                    type: 'boolean',
                    default: false
                },
                {
                    name: 'first_name',
                    type: 'varchar',
                },
                {
                    name: 'last_name',
                    type: 'varchar',
                },
                {
                    name: 'middle_name',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'suffix',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'email',
                    type: 'varchar',
                },
                {
                    name: 'phone',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'roles',
                    type: 'text[]',
                    isNullable: true
                },
                {
                    name: 'last_login',
                    type: 'timestamp(6) with time zone',
                    isNullable: true
                },
                {
                    name: 'status',
                    type: 'int',
                    default: 1,
                },
                {
                    name: 'password_token',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'last_company_selected',
                    type: 'int',
                    isNullable: true
                },
            ]
        }), true);

        await queryRunner.createForeignKey("users", new TableForeignKey({
            columnNames: ["last_company_selected"],
            referencedColumnNames: ["id"],
            referencedTableName: "companies",
            onDelete: 'CASCADE',
        }));

        const usersUniqueConstraint = new TableUnique({ columnNames: ["username", "email"] });

        await queryRunner.createUniqueConstraint("users", usersUniqueConstraint);

        await queryRunner.createTable(new Table({
            name: "user_company_roles",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                },
                {
                    name: 'role_id',
                    type: 'int',
                    isNullable: true
                },
                {
                    name: 'company_id',
                    type: 'int',
                    isNullable: true
                },
                {
                    name: 'user_id',
                    type: 'int',
                    isNullable: true
                }
            ]
        }), true);

        await queryRunner.createForeignKey("user_company_roles", new TableForeignKey({
            columnNames: ["role_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "roles",
        }));

        await queryRunner.createForeignKey("user_company_roles", new TableForeignKey({
            columnNames: ["company_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "companies",
        }));

        await queryRunner.createForeignKey("user_company_roles", new TableForeignKey({
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: 'CASCADE',
        }));

        const user_company_rolesUniqueConstraint = new TableUnique({ columnNames: ["role_id", "company_id", "user_id"] });

        await queryRunner.createUniqueConstraint("user_company_roles", user_company_rolesUniqueConstraint);

        await queryRunner.createTable(new Table({
            name: "users_companies",
            columns: [
                {
                    name: "usersId",
                    type: "int",
                    isPrimary: true,
                },
                {
                    name: 'companiesId',
                    type: 'int',
                    isPrimary: true,
                }
            ]
        }), true);

        await queryRunner.createForeignKey("users_companies", new TableForeignKey({
            columnNames: ["companiesId"],
            referencedColumnNames: ["id"],
            referencedTableName: "companies",
            onDelete: 'CASCADE',
        }));

        await queryRunner.createForeignKey("users_companies", new TableForeignKey({
            columnNames: ["usersId"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: 'CASCADE',
        }));

        await queryRunner.createIndex("users_companies", new TableIndex({
            name: "users_companies_usersIdIdx",
            columnNames: ["usersId"]
        }));

        await queryRunner.createIndex("users_companies", new TableIndex({
            name: "users_companies_companiesIdIdx",
            columnNames: ["companiesId"]
        }));

        await queryRunner.createTable(new Table({
            name: "users_organizations",
            columns: [
                {
                    name: "usersId",
                    type: "int",
                    isPrimary: true,
                },
                {
                    name: 'organizationsId',
                    type: 'int',
                    isPrimary: true,
                }
            ]
        }), true);

        await queryRunner.createForeignKey("users_organizations", new TableForeignKey({
            columnNames: ["organizationsId"],
            referencedColumnNames: ["id"],
            referencedTableName: "organizations",
            onDelete: 'CASCADE',
        }));

        await queryRunner.createForeignKey("users_organizations", new TableForeignKey({
            columnNames: ["usersId"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: 'CASCADE',
        }));

        await queryRunner.createIndex("users_organizations", new TableIndex({
            name: "users_organizations_usersIdIdx",
            columnNames: ["usersId"]
        }));

        await queryRunner.createIndex("users_organizations", new TableIndex({
            name: "users_organizations_companiesIdIdx",
            columnNames: ["organizationsId"]
        }));

        await queryRunner.manager.query(`INSERT INTO public.addresses (id, street, city, state, zip_code, phone) VALUES (21, 'N.Ordy 45, 197', 'Minsk', 'Minsk', '22004', '+375298595616');`)
        await queryRunner.manager.query(`INSERT INTO public.addresses (id, street, city, state, zip_code, phone) VALUES (22, 'N.Ordy 45, 197', 'Minsk', 'Minsk', '22004', '+375298595616');`)
        await queryRunner.manager.query(`INSERT INTO public.addresses (id, street, city, state, zip_code, phone) VALUES (23, 'ad', 'ad', 'asd', '12332', null);`)
        await queryRunner.manager.query(`INSERT INTO public.addresses (id, street, city, state, zip_code, phone) VALUES (24, 'ad', 'ad', 'asd', '12332', null);`)
        await queryRunner.manager.query(`INSERT INTO public.addresses (id, street, city, state, zip_code, phone) VALUES (25, 'N.Ordy 45, 197', 'Minsk', 'Minsk', '22004', '+375298595616');`)
        await queryRunner.manager.query(`INSERT INTO public.addresses (id, street, city, state, zip_code, phone) VALUES (26, 'N.Ordy 45, 197', 'Minsk', 'Minsk', '22004', '+375298595616');`)
        await queryRunner.manager.query(`INSERT INTO public.addresses (id, street, city, state, zip_code, phone) VALUES (10, 'testing street', 'Buckingham, Buckinghamshire', 'Minsk', '22004', '+375298595616');`)
        await queryRunner.manager.query(`INSERT INTO public.addresses (id, street, city, state, zip_code, phone) VALUES (11, 'testing street', 'Buckingham, Buckinghamshire', 'Minsk', '22004', '+375298595616');`)
        await queryRunner.manager.query(`INSERT INTO public.addresses (id, street, city, state, zip_code, phone) VALUES (12, 'N.Ordy 45, 197', 'Minsk', 'Minsk', '22004', '+375298595616');`)
        await queryRunner.manager.query(`INSERT INTO public.addresses (id, street, city, state, zip_code, phone) VALUES (13, 'N.Ordy 45, 197', 'Minsk', 'Minsk', '22004', '+375298595616');`)
        await queryRunner.manager.query(`INSERT INTO public.addresses (id, street, city, state, zip_code, phone) VALUES (9, 'Ordy', 'Berlin', 'Berlin', '42453', '+375298595616');`)
        await queryRunner.manager.query(`INSERT INTO public.addresses (id, street, city, state, zip_code, phone) VALUES (29, 'Ordy', 'Berlin', 'Berlin', '42453', '+375298595616');`)
        await queryRunner.manager.query(`INSERT INTO public.addresses (id, street, city, state, zip_code, phone) VALUES (30, 'st. Zolny', 'Amsterdam', 'SB', '35223', null);`)
        await queryRunner.manager.query(`INSERT INTO public.addresses (id, street, city, state, zip_code, phone) VALUES (31, 'st. Zolny', 'Amsterdam', 'SB', '35223', null);`)
        await queryRunner.manager.query(`INSERT INTO public.addresses (id, street, city, state, zip_code, phone) VALUES (32, 'Test', 'City', 'State', '32433', null);`)
        await queryRunner.manager.query(`INSERT INTO public.addresses (id, street, city, state, zip_code, phone) VALUES (33, 'Test', 'City', 'State', '32433', null);`)
        await queryRunner.manager.query(`INSERT INTO public.addresses (id, street, city, state, zip_code, phone) VALUES (34, 'Street', 'City', 'State', '23434', null);`)
        await queryRunner.manager.query(`INSERT INTO public.addresses (id, street, city, state, zip_code, phone) VALUES (35, 'Street', 'City', 'State', '23434', null);`)
        await queryRunner.manager.query(`INSERT INTO public.addresses (id, street, city, state, zip_code, phone) VALUES (27, 'Doutan', 'Bosnia', 'Genric', '34252', '212-323-1231');`)
        await queryRunner.manager.query(`INSERT INTO public.addresses (id, street, city, state, zip_code, phone) VALUES (28, 'Doutan', 'Bosnia', 'Genric', '34252', '212-323-1231');`)
        await queryRunner.manager.query(`INSERT INTO public.addresses (id, street, city, state, zip_code, phone) VALUES (36, 'N.Ordy 45, 197', 'Minsk', 'Minsk!', '22004', '213-123-2312');`)
        await queryRunner.manager.query(`INSERT INTO public.addresses (id, street, city, state, zip_code, phone) VALUES (37, 'N.Ordy 45, 197', 'Minsk', 'Minsk!', '22004', '213-123-2312');`)


        await queryRunner.manager.query(`INSERT INTO public.organizations (id, name, is_deleted, status, description, "physicalAddressId", "mailingAddressId") VALUES (10, 'KFC', false, 1, 'KFC', 10, 11);`)
        await queryRunner.manager.query(`INSERT INTO public.organizations (id, name, is_deleted, status, description, "physicalAddressId", "mailingAddressId") VALUES (12, 'Primary Family', false, 1, 'Primary Family', 12, 13);`)
        await queryRunner.manager.query(`INSERT INTO public.organizations (id, name, is_deleted, status, description, "physicalAddressId", "mailingAddressId") VALUES (29, 'Martin''s and CO', false, 1, 'Martin''s and CO', 27, 28);`)
        await queryRunner.manager.query(`INSERT INTO public.organizations (id, name, is_deleted, status, description, "physicalAddressId", "mailingAddressId") VALUES (2, 'McDonalds', false, 1, 'McDonalds', null, null);`)
        await queryRunner.manager.query(`INSERT INTO public.organizations (id, name, is_deleted, status, description, "physicalAddressId", "mailingAddressId") VALUES (1, 'Samon Bill', false, 1, 'Samon Bill', null, null);`)
        await queryRunner.manager.query(`INSERT INTO public.organizations (id, name, is_deleted, status, description, "physicalAddressId", "mailingAddressId") VALUES (11, 'Alexx & Co', false, 1, 'Aladan & Co', 9, 29);`)
        await queryRunner.manager.query(`INSERT INTO public.organizations (id, name, is_deleted, status, description, "physicalAddressId", "mailingAddressId") VALUES (30, 'Alan''s Organization', false, 1, 'Alan''s Organization', null, null);`)
        await queryRunner.manager.query(`INSERT INTO public.organizations (id, name, is_deleted, status, description, "physicalAddressId", "mailingAddressId") VALUES (35, 'Trial Think', true, 1, 'Things for your mind', 30, 31);`)
        await queryRunner.manager.query(`INSERT INTO public.organizations (id, name, is_deleted, status, description, "physicalAddressId", "mailingAddressId") VALUES (36, 'Arts galery', false, 1, 'Arts galery', null, null);`)
        await queryRunner.manager.query(`INSERT INTO public.organizations (id, name, is_deleted, status, description, "physicalAddressId", "mailingAddressId") VALUES (37, 'New org for Russ', false, 1, 'New org for Russ', 32, 33);`)
        await queryRunner.manager.query(`INSERT INTO public.organizations (id, name, is_deleted, status, description, "physicalAddressId", "mailingAddressId") VALUES (38, 'Test', true, 1, 'Test', null, null);`)
        await queryRunner.manager.query(`INSERT INTO public.organizations (id, name, is_deleted, status, description, "physicalAddressId", "mailingAddressId") VALUES (39, 'Adrian''s company', false, 1, null, 34, 35);`)


        await queryRunner.manager.query(`INSERT INTO public.companies (id, code, status, name, license_number, default_withholding_state_code, default_withholding_local1_code, default_withholding_local2_code, is_multiple_local_taxation, "organizationId", is_deleted, "physicalAddressId", "mailingAddressId", country) VALUES (4, 'cmp2', 1, 'My Second company', 'adsa24asdf241', 'CA', 'RE', 'PE', false, 1, false, null, null, null);`)
        await queryRunner.manager.query(`INSERT INTO public.companies (id, code, status, name, license_number, default_withholding_state_code, default_withholding_local1_code, default_withholding_local2_code, is_multiple_local_taxation, "organizationId", is_deleted, "physicalAddressId", "mailingAddressId", country) VALUES (10, 'INTL', 1, 'Alex Intl Company', 'k3352RT5252d', null, null, null, false, 11, false, null, null, null);`)
        await queryRunner.manager.query(`INSERT INTO public.companies (id, code, status, name, license_number, default_withholding_state_code, default_withholding_local1_code, default_withholding_local2_code, is_multiple_local_taxation, "organizationId", is_deleted, "physicalAddressId", "mailingAddressId", country) VALUES (17, 'asdsd', 1, '23234234', '23123123123231', null, null, null, false, 39, false, null, null, null);`)
        await queryRunner.manager.query(`INSERT INTO public.companies (id, code, status, name, license_number, default_withholding_state_code, default_withholding_local1_code, default_withholding_local2_code, is_multiple_local_taxation, "organizationId", is_deleted, "physicalAddressId", "mailingAddressId", country) VALUES (2, 'cmp1', 1, 'Organization 3', 'adsa24asdf241', 'CA', 'RE', 'PE', false, 11, false, 36, 37, 'Belarus');`)
        await queryRunner.manager.query(`INSERT INTO public.companies (id, code, status, name, license_number, default_withholding_state_code, default_withholding_local1_code, default_withholding_local2_code, is_multiple_local_taxation, "organizationId", is_deleted, "physicalAddressId", "mailingAddressId", country) VALUES (11, 'AFC', 1, 'Alan First Company', '324sad324235235', null, null, null, false, 30, false, null, null, null);`)
        await queryRunner.manager.query(`INSERT INTO public.companies (id, code, status, name, license_number, default_withholding_state_code, default_withholding_local1_code, default_withholding_local2_code, is_multiple_local_taxation, "organizationId", is_deleted, "physicalAddressId", "mailingAddressId", country) VALUES (12, 'TFC', 1, 'Trial First company', '42342342342343242432', null, null, null, false, 35, false, null, null, null);`)
        await queryRunner.manager.query(`INSERT INTO public.companies (id, code, status, name, license_number, default_withholding_state_code, default_withholding_local1_code, default_withholding_local2_code, is_multiple_local_taxation, "organizationId", is_deleted, "physicalAddressId", "mailingAddressId", country) VALUES (13, 'AFCC', 1, 'Art First company', '324233434324', null, null, null, false, 36, false, null, null, null);`)
        await queryRunner.manager.query(`INSERT INTO public.companies (id, code, status, name, license_number, default_withholding_state_code, default_withholding_local1_code, default_withholding_local2_code, is_multiple_local_taxation, "organizationId", is_deleted, "physicalAddressId", "mailingAddressId", country) VALUES (14, 'RCF', 1, 'Russ Company First', '23423434234', null, null, null, false, 37, false, null, null, null);`)
        await queryRunner.manager.query(`INSERT INTO public.companies (id, code, status, name, license_number, default_withholding_state_code, default_withholding_local1_code, default_withholding_local2_code, is_multiple_local_taxation, "organizationId", is_deleted, "physicalAddressId", "mailingAddressId", country) VALUES (15, 'RS', 1, 'Russ Second', '3423434234', null, null, null, false, 37, false, null, null, null);`)


        await queryRunner.manager.query(`INSERT INTO public.accounts (id, code, status, fiscal_year, description, type, restriction, end_year_adjustment_budget, is_subaccount, parent_id, company_id, is_posted, restriction_sub_type) VALUES (14, 'G30', 0, 2019, 'G30', 'l', 'njt', null, false, null, 2, false, null);`)
        await queryRunner.manager.query(`INSERT INTO public.accounts (id, code, status, fiscal_year, description, type, restriction, end_year_adjustment_budget, is_subaccount, parent_id, company_id, is_posted, restriction_sub_type) VALUES (15, 'G31', 1, 2019, 'G31', 'i', 'jet', null, false, null, 2, false, null);`)
        await queryRunner.manager.query(`INSERT INTO public.accounts (id, code, status, fiscal_year, description, type, restriction, end_year_adjustment_budget, is_subaccount, parent_id, company_id, is_posted, restriction_sub_type) VALUES (17, 'G 20183', 1, 2018, 'asd', 'i', 'njt', null, false, null, 2, false, null);`)
        await queryRunner.manager.query(`INSERT INTO public.accounts (id, code, status, fiscal_year, description, type, restriction, end_year_adjustment_budget, is_subaccount, parent_id, company_id, is_posted, restriction_sub_type) VALUES (16, 'G 2019', 1, 2019, 'G 1029', 'i', 'et', null, false, null, 2, false, null);`)
        await queryRunner.manager.query(`INSERT INTO public.accounts (id, code, status, fiscal_year, description, type, restriction, end_year_adjustment_budget, is_subaccount, parent_id, company_id, is_posted, restriction_sub_type) VALUES (18, 'S14', 1, null, 'Sub Acc', null, null, null, true, null, 2, false, null);`)
        await queryRunner.manager.query(`INSERT INTO public.accounts (id, code, status, fiscal_year, description, type, restriction, end_year_adjustment_budget, is_subaccount, parent_id, company_id, is_posted, restriction_sub_type) VALUES (19, 'TTS', 1, null, 'test', null, null, null, true, 16, 2, false, null);`)
        await queryRunner.manager.query(`INSERT INTO public.accounts (id, code, status, fiscal_year, description, type, restriction, end_year_adjustment_budget, is_subaccount, parent_id, company_id, is_posted, restriction_sub_type) VALUES (20, 'S15', 1, null, 'Tsdff', null, null, null, true, 15, 2, false, null);`)
        await queryRunner.manager.query(`INSERT INTO public.accounts (id, code, status, fiscal_year, description, type, restriction, end_year_adjustment_budget, is_subaccount, parent_id, company_id, is_posted, restriction_sub_type) VALUES (22, 'AINT2', 1, 2019, 'AINT2', 'i', 'et', null, false, null, 10, false, null);`)
        await queryRunner.manager.query(`INSERT INTO public.accounts (id, code, status, fiscal_year, description, type, restriction, end_year_adjustment_budget, is_subaccount, parent_id, company_id, is_posted, restriction_sub_type) VALUES (23, 'SAINT1', 1, null, 'SAINT1', null, null, null, true, null, 10, false, null);`)
        await queryRunner.manager.query(`INSERT INTO public.accounts (id, code, status, fiscal_year, description, type, restriction, end_year_adjustment_budget, is_subaccount, parent_id, company_id, is_posted, restriction_sub_type) VALUES (24, 'SAINT2', 1, null, 'SAINT2', null, null, null, true, null, 10, false, null);`)
        await queryRunner.manager.query(`INSERT INTO public.accounts (id, code, status, fiscal_year, description, type, restriction, end_year_adjustment_budget, is_subaccount, parent_id, company_id, is_posted, restriction_sub_type) VALUES (25, 'SAINT3', 1, null, 'SAINT3', null, null, null, true, 22, 10, false, null);`)
        await queryRunner.manager.query(`INSERT INTO public.accounts (id, code, status, fiscal_year, description, type, restriction, end_year_adjustment_budget, is_subaccount, parent_id, company_id, is_posted, restriction_sub_type) VALUES (26, 'SG2019', 1, null, 'SG 2019', null, null, null, true, 16, 2, false, null);`)
        await queryRunner.manager.query(`INSERT INTO public.accounts (id, code, status, fiscal_year, description, type, restriction, end_year_adjustment_budget, is_subaccount, parent_id, company_id, is_posted, restriction_sub_type) VALUES (27, '1600', 1, 2018, 'Construction Equipment!', 'a', null, 0.00, false, null, 10, false, null);`)
        await queryRunner.manager.query(`INSERT INTO public.accounts (id, code, status, fiscal_year, description, type, restriction, end_year_adjustment_budget, is_subaccount, parent_id, company_id, is_posted, restriction_sub_type) VALUES (21, 'AINT1', 1, 2019, 'AINT1', 'l', 'njt', null, false, null, 10, false, null);`)
        await queryRunner.manager.query(`INSERT INTO public.accounts (id, code, status, fiscal_year, description, type, restriction, end_year_adjustment_budget, is_subaccount, parent_id, company_id, is_posted, restriction_sub_type) VALUES (30, 'AINT3', 1, 2019, 'AINT3', 'l', 'jet', null, false, null, 10, false, null);`)
        await queryRunner.manager.query(`INSERT INTO public.accounts (id, code, status, fiscal_year, description, type, restriction, end_year_adjustment_budget, is_subaccount, parent_id, company_id, is_posted, restriction_sub_type) VALUES (32, '1119', 1, 2019, 'test 1119', 'a', null, 0.00, false, null, 10, false, null);`)
    

        await queryRunner.manager.query(`INSERT INTO public.customers (id, code, status, name, address, contact_person, invoice_terms_message, current_year_billings, last_year_billings, default_sales_tax_rate, default_sales_tax_state_code, default_sales_tax_district_code, this_year_billings, to_date_billings, is_exempt_for_late_fee, contact_email, is_print_statements, "physicalAddressId", "mailingAddressId", company, default_account_id, default_sub_account_id, last_payment_date) VALUES (9, 'test', 1, 'sadasd', null, 'asdasd', 'sasdasdas', null, 324324.00, 324.00, '44', '4234', 234.00, 234234234.00, false, 'asdasdas@sasad.sdfsd', false, null, null, 10, null, null, null);`)
        await queryRunner.manager.query(`INSERT INTO public.customers (id, code, status, name, address, contact_person, invoice_terms_message, current_year_billings, last_year_billings, default_sales_tax_rate, default_sales_tax_state_code, default_sales_tax_district_code, this_year_billings, to_date_billings, is_exempt_for_late_fee, contact_email, is_print_statements, "physicalAddressId", "mailingAddressId", company, default_account_id, default_sub_account_id, last_payment_date) VALUES (10, 'resad', 1, 'asdasd', null, 'asdasd', 'asdsdsd', null, 3.00, 23.00, '3', '3', 3.00, 3.00, false, 'asdasd', false, null, null, 10, null, null, null);`)
        await queryRunner.manager.query(`INSERT INTO public.customers (id, code, status, name, address, contact_person, invoice_terms_message, current_year_billings, last_year_billings, default_sales_tax_rate, default_sales_tax_state_code, default_sales_tax_district_code, this_year_billings, to_date_billings, is_exempt_for_late_fee, contact_email, is_print_statements, "physicalAddressId", "mailingAddressId", company, default_account_id, default_sub_account_id, last_payment_date) VALUES (11, 'resad', 1, 'asdasd', null, 'asdasd', 'asdsdsd', null, 3.00, 23.00, '3', '3', 3.00, 3.00, false, 'asdasd', false, null, null, 10, null, null, null);`)
        await queryRunner.manager.query(`INSERT INTO public.customers (id, code, status, name, address, contact_person, invoice_terms_message, current_year_billings, last_year_billings, default_sales_tax_rate, default_sales_tax_state_code, default_sales_tax_district_code, this_year_billings, to_date_billings, is_exempt_for_late_fee, contact_email, is_print_statements, "physicalAddressId", "mailingAddressId", company, default_account_id, default_sub_account_id, last_payment_date) VALUES (12, 'resad', 1, 'asdasd', null, 'asdasd', 'asdsdsd', null, 3.00, 23.00, '3', '3', 3.00, 3.00, false, 'asdasd', false, null, null, 10, null, null, null);`)
        await queryRunner.manager.query(`INSERT INTO public.customers (id, code, status, name, address, contact_person, invoice_terms_message, current_year_billings, last_year_billings, default_sales_tax_rate, default_sales_tax_state_code, default_sales_tax_district_code, this_year_billings, to_date_billings, is_exempt_for_late_fee, contact_email, is_print_statements, "physicalAddressId", "mailingAddressId", company, default_account_id, default_sub_account_id, last_payment_date) VALUES (8, 'TC', 1, 'Test customer', null, 'Test Contanct', 'asdasdasd', null, 3.00, 213.00, '3', '3', 123.00, 3.00, true, 'contact@gmai.com', false, null, null, 10, 22, 23, null);`)
        await queryRunner.manager.query(`INSERT INTO public.customers (id, code, status, name, address, contact_person, invoice_terms_message, current_year_billings, last_year_billings, default_sales_tax_rate, default_sales_tax_state_code, default_sales_tax_district_code, this_year_billings, to_date_billings, is_exempt_for_late_fee, contact_email, is_print_statements, "physicalAddressId", "mailingAddressId", company, default_account_id, default_sub_account_id, last_payment_date) VALUES (13, 'CM1', 1, 'Customer 23', null, 'Alex N.', 'Some customers terms here', null, 234.00, 12.00, 'CP', 'LM', 234.00, 33.00, true, 'alex.mail.com', false, null, null, 10, 21, 23, null);`)
        await queryRunner.manager.query(`INSERT INTO public.customers (id, code, status, name, address, contact_person, invoice_terms_message, current_year_billings, last_year_billings, default_sales_tax_rate, default_sales_tax_state_code, default_sales_tax_district_code, this_year_billings, to_date_billings, is_exempt_for_late_fee, contact_email, is_print_statements, "physicalAddressId", "mailingAddressId", company, default_account_id, default_sub_account_id, last_payment_date) VALUES (14, 'MILPAR', 1, 'Millbrook Partners, Ltd.', null, 'Dave Johanson', 'Payable Upon Receipt of Invoice', 132183.00, 0.00, 0.00, 'CA', 'LOSA', 546265.00, 546265.00, true, 'Millbrook Partners, Ltd.', true, null, null, 10, 27, null, null);`)


        await queryRunner.manager.query(`INSERT INTO public.general_ledger (id, period_1_status, period_2_status, period_3_status, period_4_status, period_5_status, period_6_status, period_7_status, period_8_status, period_9_status, period_10_status, period_11_status, period_12_status, current_fiscal_year, is_prior_fiscal_year_closed, current_fiscal_year_opened, current_bank_balance, "retainedEarningsAccountId", "retainedEarningsSubAccountId", company_id, calendar_year_period_1, period_1_month, period_2_month, period_3_month, period_4_month, period_5_month, period_6_month, period_7_month, period_8_month, period_9_month, period_10_month, period_11_month, period_12_month, last_journal_posted, last_fiscal_year_posted, last_fiscal_period_posted, last_fiscal_year_balance_posted, reconciliation_date, "calYearOf1stPerOfFiscalYear") VALUES (17, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 2019, false, '2019-11-06', 0.00, 16, 19, 2, 2019, '4', '5', '6', '7', '8', '9', '10', '11', '12', '1', '2', '3', null, null, null, null, null, null);`)
        await queryRunner.manager.query(`INSERT INTO public.general_ledger (id, period_1_status, period_2_status, period_3_status, period_4_status, period_5_status, period_6_status, period_7_status, period_8_status, period_9_status, period_10_status, period_11_status, period_12_status, current_fiscal_year, is_prior_fiscal_year_closed, current_fiscal_year_opened, current_bank_balance, "retainedEarningsAccountId", "retainedEarningsSubAccountId", company_id, calendar_year_period_1, period_1_month, period_2_month, period_3_month, period_4_month, period_5_month, period_6_month, period_7_month, period_8_month, period_9_month, period_10_month, period_11_month, period_12_month, last_journal_posted, last_fiscal_year_posted, last_fiscal_period_posted, last_fiscal_year_balance_posted, reconciliation_date, "calYearOf1stPerOfFiscalYear") VALUES (18, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2019, false, '2019-11-07', 0.00, 21, 25, 17, 2019, '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', null, null, null, null, null, null);`)
        await queryRunner.manager.query(`INSERT INTO public.general_ledger (id, period_1_status, period_2_status, period_3_status, period_4_status, period_5_status, period_6_status, period_7_status, period_8_status, period_9_status, period_10_status, period_11_status, period_12_status, current_fiscal_year, is_prior_fiscal_year_closed, current_fiscal_year_opened, current_bank_balance, "retainedEarningsAccountId", "retainedEarningsSubAccountId", company_id, calendar_year_period_1, period_1_month, period_2_month, period_3_month, period_4_month, period_5_month, period_6_month, period_7_month, period_8_month, period_9_month, period_10_month, period_11_month, period_12_month, last_journal_posted, last_fiscal_year_posted, last_fiscal_period_posted, last_fiscal_year_balance_posted, reconciliation_date, "calYearOf1stPerOfFiscalYear") VALUES (33, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2019, false, '2019-11-23', 0.00, 27, null, 10, null, '10', '11', '12', '1', '2', '3', '4', '5', '6', '7', '8', '9', 9, 2018, 1, '2019', '090119', '2018');`)
        

        await queryRunner.manager.query(`INSERT INTO public.general_ledger_accounts_budget (id, period_1_budget, period_2_budget, period_3_budget, period_4_budget, period_5_budget, period_6_budget, period_7_budget, period_8_budget, period_9_budget, period_10_budget, period_11_budget, period_12_budget, "accountId", "generalLedgerId") VALUES (8, 44.00, 2.00, 3.00, 4.00, 213.00, 42.00, 2.00, 3.00, 213.00, 123.00, 213.00, 12.00, 14, null);`)
        await queryRunner.manager.query(`INSERT INTO public.general_ledger_accounts_budget (id, period_1_budget, period_2_budget, period_3_budget, period_4_budget, period_5_budget, period_6_budget, period_7_budget, period_8_budget, period_9_budget, period_10_budget, period_11_budget, period_12_budget, "accountId", "generalLedgerId") VALUES (9, 41.67, 41.67, 41.67, 41.67, 41.67, 41.67, 41.67, 41.67, 1.00, 41.67, 41.67, 41.67, 19, null);`)
        await queryRunner.manager.query(`INSERT INTO public.general_ledger_accounts_budget (id, period_1_budget, period_2_budget, period_3_budget, period_4_budget, period_5_budget, period_6_budget, period_7_budget, period_8_budget, period_9_budget, period_10_budget, period_11_budget, period_12_budget, "accountId", "generalLedgerId") VALUES (10, 1000.00, 1000.00, 1000.00, 1000.00, 1000.00, 1000.00, 12000.00, 1000.00, 1000.00, 1000.00, 1000.00, 1000.00, 25, null);`)
        await queryRunner.manager.query(`INSERT INTO public.general_ledger_accounts_budget (id, period_1_budget, period_2_budget, period_3_budget, period_4_budget, period_5_budget, period_6_budget, period_7_budget, period_8_budget, period_9_budget, period_10_budget, period_11_budget, period_12_budget, "accountId", "generalLedgerId") VALUES (11, 10.00, 10.00, 12.00, 10.00, 10.00, 10.00, 10.00, 10.00, 10.00, 10.00, 10.00, 10.00, 23, null);`)
        await queryRunner.manager.query(`INSERT INTO public.general_ledger_accounts_budget (id, period_1_budget, period_2_budget, period_3_budget, period_4_budget, period_5_budget, period_6_budget, period_7_budget, period_8_budget, period_9_budget, period_10_budget, period_11_budget, period_12_budget, "accountId", "generalLedgerId") VALUES (12, 1000.00, 1000.00, 1000.00, 1000.00, 1000.00, 1100.00, 1000.00, 1000.00, 1000.00, 1000.00, 1000.00, 1000.00, 26, null);`)
        

        await queryRunner.manager.query(`INSERT INTO public.roles (id, name, description, "organizationId", p_general_ledger, p_job_cost) VALUES (2, 'Manager', 'Manager Role', 11, '{delete}', null);`)
        await queryRunner.manager.query(`INSERT INTO public.roles (id, name, description, "organizationId", p_general_ledger, p_job_cost) VALUES (1, 'Accountant', 'Accountant Role', 11, '{read,write}', '{read}');`)
        await queryRunner.manager.query(`INSERT INTO public.roles (id, name, description, "organizationId", p_general_ledger, p_job_cost) VALUES (4, 'Accountant', 'Accountant Role', 30, '{read,write}', '{read}');`)
        await queryRunner.manager.query(`INSERT INTO public.roles (id, name, description, "organizationId", p_general_ledger, p_job_cost) VALUES (5, 'Manager', 'Manager Role', 30, '{delete}', null);`)
        await queryRunner.manager.query(`INSERT INTO public.roles (id, name, description, "organizationId", p_general_ledger, p_job_cost) VALUES (8, 'Manager', 'Manager Role', 35, '{delete}', null);`)
        await queryRunner.manager.query(`INSERT INTO public.roles (id, name, description, "organizationId", p_general_ledger, p_job_cost) VALUES (9, 'Accountant', 'Accountant Role', 35, '{read,write}', '{read}');`)
        await queryRunner.manager.query(`INSERT INTO public.roles (id, name, description, "organizationId", p_general_ledger, p_job_cost) VALUES (10, 'Manager', 'Manager Role', 36, '{delete}', null);`)
        await queryRunner.manager.query(`INSERT INTO public.roles (id, name, description, "organizationId", p_general_ledger, p_job_cost) VALUES (11, 'Accountant', 'Accountant Role', 36, '{read,write}', '{read}');`)
        await queryRunner.manager.query(`INSERT INTO public.roles (id, name, description, "organizationId", p_general_ledger, p_job_cost) VALUES (12, 'Manager', 'Manager Role', 37, '{delete}', null);`)
        await queryRunner.manager.query(`INSERT INTO public.roles (id, name, description, "organizationId", p_general_ledger, p_job_cost) VALUES (13, 'Accountant', 'Accountant Role', 37, '{read,write}', '{read}');`)
        await queryRunner.manager.query(`INSERT INTO public.roles (id, name, description, "organizationId", p_general_ledger, p_job_cost) VALUES (17, 'Manager', 'Test', 39, '{create,read,delete}', '{update,read}');`)
        await queryRunner.manager.query(`INSERT INTO public.roles (id, name, description, "organizationId", p_general_ledger, p_job_cost) VALUES (18, 'Accountant', 'Accountant', 39, '{create,read,update,delete}', null);`)


        await queryRunner.manager.query(`INSERT INTO public.raw_general_ledger (id, value, relation) VALUES (1, '{"VersionCode": "|D|", "SortedRecNum": "1", "Period1Status": "", "Period2Status": "", "Period3Status": "", "Period4Status": "", "Period5Status": "", "Period6Status": "", "Period7Status": "", "Period8Status": "", "Period9Status": "", "Period10Status": "", "Period11Status": "", "Period12Status": "", "CurrentFiscalYear": "2019", "PriorFYStatusFlag": "", "CurrentBankRecDate": "090119", "Period1Description": "October", "Period2Description": "November", "Period3Description": "December", "Period4Description": "January", "Period5Description": "February", "Period6Description": "March", "Period7Description": "April", "Period8Description": "May", "Period9Description": "June", "RetEarningsAccount": "1600", "RetEarningsSubAcnt": "", "CurBankStatementBal": "0", "Period10Description": "July", "Period11Description": "August", "Period12Description": "September", "LastJournalNumPosted": "9", "DateCurrentFYWasOpened": "100617", "LastFiscalYearGLPosted": "2018", "LastFiscalPeriodGLPosted": "1", "CalYearOf1stPerOfFiscalYear": "2018", "LastFiscalYearOperBalPosted": "2019"}', 33);`)
        

        await queryRunner.manager.query(`INSERT INTO public.raw_accounts (id, value, relation) VALUES (1, '{"Status": " ", "Future1": " ", "JobFlag": " ", "FiscalYear": "aa", "AccountType": "A", "Description": "test 1119                ", "PostingFlag": " ", "RecordStatus": " ", "SortedRecNum": "0", "FiscalCentury": "20", "GLAccountCode": "1119", "PhysRecordNum": "2196", "Period0AmountToDate": "0", "Period1AmountToDate": "0", "Period2AmountToDate": "0", "Period3AmountToDate": "0", "Period4AmountToDate": "0", "Period5AmountToDate": "0", "Period6AmountToDate": "0", "Period7AmountToDate": "0", "Period8AmountToDate": "0", "Period9AmountToDate": "0", "Period10AmountToDate": "0", "Period11AmountToDate": "0", "Period12AmountToDate": "0", "JobCostOrIncomeTypeFlag": " ", "Period13YearEndAdjAmntToDate": "0"}', 32);`);


        await queryRunner.manager.query(`INSERT INTO public.users (id, username, password, is_deleted, first_name, last_name, middle_name, suffix, email, phone, roles, last_login, status, password_token, last_company_selected) VALUES (85, 'adsad', null, false, 'asdasd', 'adasdasd', null, null, 'asdas@asd.ad', '213-131-2131', null, null, 1, '4bbead3f9b7bc6acd0de31ebfc420a8e40b1dc5c93209be4f282119b3b0c36ddba2188d153251a522bffb1bfd2a5e5e2', null);`)
        await queryRunner.manager.query(`INSERT INTO public.users (id, username, password, is_deleted, first_name, last_name, middle_name, suffix, email, phone, roles, last_login, status, password_token, last_company_selected) VALUES (84, 'kfc_plain', null, false, 'Plain', 'User KFC', null, null, 'assd@asdasd.asd', null, null, null, 1, 'd58a89e2126b38bc80ee3af7436c56253077822149316fbff79b09e884e7c9056b18f243cfe8e73e56e02cd6ab51faaf', null);`)
        await queryRunner.manager.query(`INSERT INTO public.users (id, username, password, is_deleted, first_name, last_name, middle_name, suffix, email, phone, roles, last_login, status, password_token, last_company_selected) VALUES (87, 'admin', '$2b$10$clHYYnmFeDY1f6dFbUKWUuJxOQPECQIw1ZBjHcfenznPAdeWkeOWC', false, 'Alex', 'Admin', null, null, 'alexadmin@gmail.com', null, '{ADMINISTRATOR}', '2019-11-23 09:15:13.642000', 1, '9c15e022fa72bce787ad1873772aa714ce093d16d47ef3b4a173a71caf559af8c35ad8afe364d7372d0140145abaddd0', null);`)
        await queryRunner.manager.query(`INSERT INTO public.users (id, username, password, is_deleted, first_name, last_name, middle_name, suffix, email, phone, roles, last_login, status, password_token, last_company_selected) VALUES (88, 'alexaccountant', '$2b$10$clHYYnmFeDY1f6dFbUKWUuJxOQPECQIw1ZBjHcfenznPAdeWkeOWC', false, 'Alex!!', 'Accountant', null, null, 'alexaccountant@gmail.com', '232-343-4423', null, '2019-11-23 09:16:44.176000', 1, '0e1b902a57c525d8cf747971460f065e1f1a8c557e2652b8abb495f13c59a1417a45df0264cbe119a37caaaf6a05fd05', 10);`)
        await queryRunner.manager.query(`INSERT INTO public.users (id, username, password, is_deleted, first_name, last_name, middle_name, suffix, email, phone, roles, last_login, status, password_token, last_company_selected) VALUES (83, 'kfc_admin', '$2b$10$clHYYnmFeDY1f6dFbUKWUuJxOQPECQIw1ZBjHcfenznPAdeWkeOWC', false, 'KFC', 'Admin', null, null, 'a.dolbik@flatlogic.com', '213-123-1232', '{ADMINISTRATOR}', null, 1, '91bcde05a768d92dfe6b4e88b46e5d19b6eb8c54f31b3ab7515753449a4ab16e4dff4a0adfe14ddb5d0f50117f8e19bd', null);`)
        await queryRunner.manager.query(`INSERT INTO public.users (id, username, password, is_deleted, first_name, last_name, middle_name, suffix, email, phone, roles, last_login, status, password_token, last_company_selected) VALUES (86, 'asdasdasdasd', '$2b$10$iqLQW0zY4LJmIEvDXE5xn.L5GSDosRsGdCKhXoKSc8Qwrlq0x7Baq', false, 'asdads', 'asd', null, null, 'adsa@asdasd.ad', '213-213-1231', '{ADMINISTRATOR}', '2019-10-30 20:32:45.356000', 1, null, null);`)
        await queryRunner.manager.query(`INSERT INTO public.users (id, username, password, is_deleted, first_name, last_name, middle_name, suffix, email, phone, roles, last_login, status, password_token, last_company_selected) VALUES (90, 'alex_acc_2', '$2b$10$WCa67qQH1B46/GR7yJTIb./SOYzYZ6qFzHkM0x2HbxekVcocezbcG', false, 'Alex', 'Accountant 2E', null, null, 'alex_acc_2@gmail.com', null, null, '2019-11-08 12:09:34.731000', 0, '61ce13f9073b5003205381af6861dd4f97f4eee67b4699cad9c709ee8f99eefadc63ce89924a4749c15756f076b23cc5', 10);`)
        await queryRunner.manager.query(`INSERT INTO public.users (id, username, password, is_deleted, first_name, last_name, middle_name, suffix, email, phone, roles, last_login, status, password_token, last_company_selected) VALUES (14, 'superUser', '$2b$10$clHYYnmFeDY1f6dFbUKWUuJxOQPECQIw1ZBjHcfenznPAdeWkeOWC', false, 'Super', 'User', null, null, 'alexandr.dolbik@gmail.com', '+375298595617', '{SUPER_USER}', '2019-11-10 08:57:02.508000', 1, null, null);`)


        await queryRunner.manager.query(`INSERT INTO public.user_company_roles (id, role_id, company_id, user_id) VALUES (79, 1, 10, 87);`)
        await queryRunner.manager.query(`INSERT INTO public.user_company_roles (id, role_id, company_id, user_id) VALUES (80, 1, 2, 87);`)
        await queryRunner.manager.query(`INSERT INTO public.user_company_roles (id, role_id, company_id, user_id) VALUES (81, 1, 10, 88);`)
        await queryRunner.manager.query(`INSERT INTO public.user_company_roles (id, role_id, company_id, user_id) VALUES (82, 1, 2, 88);`)
        await queryRunner.manager.query(`INSERT INTO public.user_company_roles (id, role_id, company_id, user_id) VALUES (83, 1, 10, 90);`)
        await queryRunner.manager.query(`INSERT INTO public.user_company_roles (id, role_id, company_id, user_id) VALUES (84, 1, 2, 90);`)


        await queryRunner.manager.query(`INSERT INTO public.users_companies ("usersId", "companiesId") VALUES (87, 10);`)
        await queryRunner.manager.query(`INSERT INTO public.users_companies ("usersId", "companiesId") VALUES (87, 2);`)
        await queryRunner.manager.query(`INSERT INTO public.users_companies ("usersId", "companiesId") VALUES (88, 10);`)
        await queryRunner.manager.query(`INSERT INTO public.users_companies ("usersId", "companiesId") VALUES (88, 2);`)
        await queryRunner.manager.query(`INSERT INTO public.users_companies ("usersId", "companiesId") VALUES (90, 10);`)
        await queryRunner.manager.query(`INSERT INTO public.users_companies ("usersId", "companiesId") VALUES (90, 2);`)


        await queryRunner.manager.query(`INSERT INTO public.users_organizations ("usersId", "organizationsId") VALUES (83, 10);`)
        await queryRunner.manager.query(`INSERT INTO public.users_organizations ("usersId", "organizationsId") VALUES (84, 10);`)
        await queryRunner.manager.query(`INSERT INTO public.users_organizations ("usersId", "organizationsId") VALUES (85, 10);`)
        await queryRunner.manager.query(`INSERT INTO public.users_organizations ("usersId", "organizationsId") VALUES (86, 10);`)
        await queryRunner.manager.query(`INSERT INTO public.users_organizations ("usersId", "organizationsId") VALUES (87, 11);`)
        await queryRunner.manager.query(`INSERT INTO public.users_organizations ("usersId", "organizationsId") VALUES (88, 11);`)
        await queryRunner.manager.query(`INSERT INTO public.users_organizations ("usersId", "organizationsId") VALUES (90, 11);`)

    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users_organizations");
        await queryRunner.dropTable("users_companies");
        await queryRunner.dropTable("user_company_roles");
        await queryRunner.dropTable("users");
        await queryRunner.dropTable("raw_accounts");
        await queryRunner.dropTable("raw_general_ledger");
        await queryRunner.dropTable("roles");
        await queryRunner.dropTable("gl_periods");
        await queryRunner.dropTable("general_ledger_accounts_budget");
        await queryRunner.dropTable("general_ledger");
        await queryRunner.dropTable("employees");
        await queryRunner.dropTable("customers");
        await queryRunner.dropTable("address");
        await queryRunner.dropTable("accounts");
        await queryRunner.dropTable("companies", true);
        await queryRunner.dropTable("organizations", true);
        await queryRunner.dropTable("addresses");
    }


}
