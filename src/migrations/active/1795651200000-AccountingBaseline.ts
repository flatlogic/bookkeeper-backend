import { MigrationInterface, QueryRunner } from "typeorm";

// Snapshot of the accounting tables at the transition from synchronize to migrations.
const tables: Record<string, {columns: Record<string, string>, constraints: string[]}> = {
  addresses: {
    columns: {
      id: "SERIAL NOT NULL",
      street: "character varying NOT NULL",
      city: "character varying NOT NULL",
      state: "character varying NOT NULL",
      zip_code: "character varying NOT NULL",
      phone: "character varying",
    },
    constraints: [
      `CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id")`,
    ],
  },
  roles: {
    columns: {
      id: "SERIAL NOT NULL",
      name: "character varying NOT NULL",
      description: "character varying",
      p_general_ledger: "text array",
      p_job_cost: "text array",
      organizationId: "integer",
    },
    constraints: [
      `CONSTRAINT "UQ_d27a5e69fb41256abed347a85eb" UNIQUE ("name", "organizationId")`,
      `CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id")`,
    ],
  },
  organizations: {
    columns: {
      id: "SERIAL NOT NULL",
      name: "character varying NOT NULL",
      description: "text",
      is_deleted: "boolean NOT NULL DEFAULT false",
      status: "integer NOT NULL DEFAULT '1'",
      physicalAddressId: "integer",
      mailingAddressId: "integer",
    },
    constraints: [
      `CONSTRAINT "UQ_9b7ca6d30b94fef571cff876884" UNIQUE ("name")`,
      `CONSTRAINT "REL_3996585ba00b1cf23abedfc26b" UNIQUE ("physicalAddressId")`,
      `CONSTRAINT "REL_d230e0bc4768c0bc34f40745b1" UNIQUE ("mailingAddressId")`,
      `CONSTRAINT "PK_6b031fcd0863e3f6b44230163f9" PRIMARY KEY ("id")`,
    ],
  },
  user_company_roles: {
    columns: {
      id: "SERIAL NOT NULL",
      role_id: "integer",
      company_id: "integer",
      user_id: "integer",
    },
    constraints: [
      `CONSTRAINT "UQ_a6706215e3e6e3a17fab4e80fe3" UNIQUE ("role_id", "company_id", "user_id")`,
      `CONSTRAINT "PK_508675bf8cda811ec8ff812e337" PRIMARY KEY ("id")`,
    ],
  },
  companies: {
    columns: {
      id: "SERIAL NOT NULL",
      is_deleted: "boolean NOT NULL DEFAULT false",
      code: "character varying NOT NULL",
      status: "integer NOT NULL DEFAULT '1'",
      name: "character varying NOT NULL",
      country: "character varying",
      license_number: "character varying",
      default_withholding_state_code: "character varying",
      default_withholding_local1_code: "character varying",
      default_withholding_local2_code: "character varying",
      is_multiple_local_taxation: "boolean NOT NULL DEFAULT false",
      organizationId: "integer",
      physicalAddressId: "integer",
      mailingAddressId: "integer",
    },
    constraints: [
      `CONSTRAINT "UQ_80af3e6808151c3210b4d5a2185" UNIQUE ("code")`,
      `CONSTRAINT "REL_1538348ba37acb2e455048f1b6" UNIQUE ("physicalAddressId")`,
      `CONSTRAINT "REL_8acdea6d08f18baa9b35f1b0ac" UNIQUE ("mailingAddressId")`,
      `CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id")`,
    ],
  },
  users: {
    columns: {
      id: "SERIAL NOT NULL",
      is_deleted: "boolean NOT NULL DEFAULT false",
      status: "integer NOT NULL DEFAULT '1'",
      username: "character varying NOT NULL",
      password: "character varying",
      first_name: "character varying NOT NULL",
      last_name: "character varying NOT NULL",
      middle_name: "character varying",
      suffix: "character varying",
      email: "character varying NOT NULL",
      phone: "character varying",
      roles: "text array",
      last_login: "TIMESTAMP(6) WITH TIME ZONE",
      password_token: "character varying",
      last_company_selected: "integer",
    },
    constraints: [
      `CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`,
      `CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username")`,
      `CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`,
    ],
  },
  accounts: {
    columns: {
      id: "SERIAL NOT NULL",
      code: "character varying NOT NULL",
      status: "integer NOT NULL DEFAULT '1'",
      fiscal_year: "integer",
      description: "text NOT NULL",
      type: "character varying",
      restriction: "character varying",
      restriction_sub_type: "character varying",
      end_year_adjustment_budget: "numeric(5,2)",
      is_subaccount: "boolean NOT NULL DEFAULT false",
      is_posted: "boolean DEFAULT false",
      parent_id: "integer",
      company_id: "integer",
    },
    constraints: [
      `CONSTRAINT "UQ_5d5037c18990a770834716861aa" UNIQUE ("code", "fiscal_year")`,
      `CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id")`,
    ],
  },
  general_ledger: {
    columns: {
      id: "SERIAL NOT NULL",
      period_1_month: "character varying NOT NULL",
      period_1_status: "integer NOT NULL",
      period_2_month: "character varying NOT NULL",
      period_2_status: "integer NOT NULL",
      period_3_month: "character varying NOT NULL",
      period_3_status: "integer NOT NULL",
      period_4_month: "character varying NOT NULL",
      period_4_status: "integer NOT NULL",
      period_5_month: "character varying NOT NULL",
      period_5_status: "integer NOT NULL",
      period_6_month: "character varying NOT NULL",
      period_6_status: "integer NOT NULL",
      period_7_month: "character varying NOT NULL",
      period_7_status: "integer NOT NULL",
      period_8_month: "character varying NOT NULL",
      period_8_status: "integer NOT NULL",
      period_9_month: "character varying NOT NULL",
      period_9_status: "integer NOT NULL",
      period_10_month: "character varying NOT NULL",
      period_10_status: "integer NOT NULL",
      period_11_month: "character varying NOT NULL",
      period_11_status: "integer NOT NULL",
      period_12_month: "character varying NOT NULL",
      period_12_status: "integer NOT NULL",
      current_fiscal_year: "integer NOT NULL",
      calendar_year_period_1: "integer",
      is_prior_fiscal_year_closed: "boolean NOT NULL",
      current_fiscal_year_opened: "date NOT NULL",
      current_bank_balance: "numeric(5,2) NOT NULL",
      last_journal_posted: "integer",
      last_fiscal_year_posted: "integer",
      last_fiscal_period_posted: "integer",
      last_fiscal_year_balance_posted: "character varying",
      reconciliation_date: "character varying",
      calYearOf1stPerOfFiscalYear: "character varying",
      retainedEarningsAccountId: "integer",
      retainedEarningsSubAccountId: "integer",
      companyId: "integer",
    },
    constraints: [
      `CONSTRAINT "UQ_86c5e34eb7e155c7f8247927bba" UNIQUE ("companyId", "current_fiscal_year")`,
      `CONSTRAINT "PK_a148029e2181866d8a7fe139981" PRIMARY KEY ("id")`,
    ],
  },
  general_ledger_accounts_budget: {
    columns: {
      id: "SERIAL NOT NULL",
      period_1_budget: "numeric(20,2) NOT NULL",
      period_2_budget: "numeric(20,2) NOT NULL",
      period_3_budget: "numeric(20,2) NOT NULL",
      period_4_budget: "numeric(20,2) NOT NULL",
      period_5_budget: "numeric(20,2) NOT NULL",
      period_6_budget: "numeric(20,2) NOT NULL",
      period_7_budget: "numeric(20,2) NOT NULL",
      period_8_budget: "numeric(20,2) NOT NULL",
      period_9_budget: "numeric(20,2) NOT NULL",
      period_10_budget: "numeric(20,2) NOT NULL",
      period_11_budget: "numeric(20,2) NOT NULL",
      period_12_budget: "numeric(20,2) NOT NULL",
      accountId: "integer",
      generalLedgerId: "integer",
    },
    constraints: [
      `CONSTRAINT "UQ_bad7d9089fd63d5dca251f9d08d" UNIQUE ("accountId", "generalLedgerId")`,
      `CONSTRAINT "PK_a93ca38a6da56b05b20f18b94f0" PRIMARY KEY ("id")`,
    ],
  },
  employees: {
    columns: {
      city: "character varying NOT NULL",
      zip_code: "character varying",
      zip_code_ext: "character varying",
      tel_area_code: "integer",
      tel_prefix: "integer NOT NULL",
      tel_number: "integer NOT NULL",
      license_number: "character varying",
      fax_area_code: "integer",
      fax_prefix: "integer",
      fax_number: "character varying",
      id: "SERIAL NOT NULL",
      code: "character varying NOT NULL",
      is_deleted: "boolean NOT NULL DEFAULT false",
      status: "character varying NOT NULL",
      name: "character varying NOT NULL",
      addressLine1: "character varying NOT NULL",
      addressLine2: "character varying",
      ssn: "character varying NOT NULL",
      minority: "character varying",
      gender: "character varying NOT NULL",
      has_pension_plan: "boolean NOT NULL",
      birthday: "date NOT NULL",
      hire_date: "date NOT NULL",
      termination_date: "date",
      rehire_date: "date",
      other_date: "date",
      state_withholding_code: "character varying NOT NULL",
      state_sui_sdi_code: "character varying NOT NULL",
      local_taxes_code: "character varying",
      tel_area_code_2: "integer",
      tel_prefix_2: "integer NOT NULL",
      tel_number_2: "integer NOT NULL",
      payment_frequency: "character varying NOT NULL",
      is_excluded_certified_payroll: "boolean NOT NULL",
      federal_withholding_allowances: "integer",
      federal_status: "character varying NOT NULL",
      federal_withholding_tax_adjustment: "character varying",
      federal_withholding_tax_amount: "numeric(5,2)",
      salary_amount: "numeric(5,2)",
      print_details_check_stub: "boolean NOT NULL",
      driver_license: "character varying",
      work_permit: "character varying",
      work_permit_expire_date: "date",
      is_union_job_override_allowed: "boolean NOT NULL",
      is_work_comp_job_override_allowed: "boolean NOT NULL",
      is_general_liability_job_override_allowed: "boolean NOT NULL",
      last_check_date: "date",
      department: "character varying",
      default_cost: "character varying",
      default_phase: "character varying",
      default_job: "character varying",
      union_code: "character varying",
      general_liability_code: "character varying",
      worker_comp_code: "character varying NOT NULL",
      craft_code: "character varying NOT NULL",
      accountId: "integer",
      subAccountId: "integer",
    },
    constraints: [
      `CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id")`,
    ],
  },
  customers: {
    columns: {
      id: "SERIAL NOT NULL",
      code: "character varying NOT NULL",
      status: "integer NOT NULL DEFAULT '1'",
      name: "character varying NOT NULL",
      address: "character varying",
      contact_person: "character varying",
      contact_email: "character varying",
      invoice_terms_message: "character varying",
      is_exempt_for_late_fee: "boolean DEFAULT false",
      is_print_statements: "boolean DEFAULT false",
      current_year_billings: "numeric(15,2)",
      default_sales_tax_rate: "numeric(15,2)",
      default_sales_tax_state_code: "character varying",
      default_sales_tax_district_code: "character varying",
      this_year_billings: "numeric(15,2)",
      last_year_billings: "numeric(15,2)",
      to_date_billings: "numeric(15,2)",
      last_payment_date: "TIMESTAMP",
      physicalAddressId: "integer",
      mailingAddressId: "integer",
      company: "integer",
      default_account_id: "integer",
      default_sub_account_id: "integer",
    },
    constraints: [
      `CONSTRAINT "REL_259d8c0f59aee13a524516a32c" UNIQUE ("physicalAddressId")`,
      `CONSTRAINT "REL_6009ae5745d9bd56de5b9485df" UNIQUE ("mailingAddressId")`,
      `CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id")`,
    ],
  },
  users_organizations: {
    columns: {
      usersId: "integer NOT NULL",
      organizationsId: "integer NOT NULL",
    },
    constraints: [
      `CONSTRAINT "PK_37b6dab3781ada2aed6e0569073" PRIMARY KEY ("usersId", "organizationsId")`,
    ],
  },
  users_companies: {
    columns: {
      usersId: "integer NOT NULL",
      companiesId: "integer NOT NULL",
    },
    constraints: [
      `CONSTRAINT "PK_b82664fbf8edc5fe9286c052e91" PRIMARY KEY ("usersId", "companiesId")`,
    ],
  },
};

const indexesAndForeignKeys = [
  `CREATE INDEX "IDX_d11c3e3a2c84172a04398937d2" ON "users_organizations" ("usersId") `,
  `CREATE INDEX "IDX_83b955437be18ff6742c5bb6a1" ON "users_organizations" ("organizationsId") `,
  `CREATE INDEX "IDX_8c459ed79d9d38de0ce8ccc6be" ON "users_companies" ("usersId") `,
  `CREATE INDEX "IDX_f150c30a741aee239f4beea864" ON "users_companies" ("companiesId") `,
  `ALTER TABLE "roles" ADD CONSTRAINT "FK_0933e1dfb2993d672af1a98f08e" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
  `ALTER TABLE "organizations" ADD CONSTRAINT "FK_3996585ba00b1cf23abedfc26ba" FOREIGN KEY ("physicalAddressId") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
  `ALTER TABLE "organizations" ADD CONSTRAINT "FK_d230e0bc4768c0bc34f40745b13" FOREIGN KEY ("mailingAddressId") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
  `ALTER TABLE "user_company_roles" ADD CONSTRAINT "FK_18b466d671b0dcbb3b03d49024a" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
  `ALTER TABLE "user_company_roles" ADD CONSTRAINT "FK_654e9d34514abfea52930f5da5c" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
  `ALTER TABLE "user_company_roles" ADD CONSTRAINT "FK_a283a1b87bf6a29f9e3667186d0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
  `ALTER TABLE "companies" ADD CONSTRAINT "FK_cfa7d558ce458748965fca390d6" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
  `ALTER TABLE "companies" ADD CONSTRAINT "FK_1538348ba37acb2e455048f1b6b" FOREIGN KEY ("physicalAddressId") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
  `ALTER TABLE "companies" ADD CONSTRAINT "FK_8acdea6d08f18baa9b35f1b0ace" FOREIGN KEY ("mailingAddressId") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
  `ALTER TABLE "users" ADD CONSTRAINT "FK_00b65ac9d3ff31355a3ba2be570" FOREIGN KEY ("last_company_selected") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
  `ALTER TABLE "accounts" ADD CONSTRAINT "FK_f7ea327e4100ce4d6002ecdd12b" FOREIGN KEY ("parent_id") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
  `ALTER TABLE "accounts" ADD CONSTRAINT "FK_b22c8136b3e83352b0013224801" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
  `ALTER TABLE "general_ledger" ADD CONSTRAINT "FK_cc6fea5ba6feeab5a5c88261e28" FOREIGN KEY ("retainedEarningsAccountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
  `ALTER TABLE "general_ledger" ADD CONSTRAINT "FK_a324704c327443c981e509fe405" FOREIGN KEY ("retainedEarningsSubAccountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
  `ALTER TABLE "general_ledger" ADD CONSTRAINT "FK_a3856d6d7c54cf86e39701d616a" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
  `ALTER TABLE "general_ledger_accounts_budget" ADD CONSTRAINT "FK_56d0cf4e57f54801a7bd68c7978" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
  `ALTER TABLE "general_ledger_accounts_budget" ADD CONSTRAINT "FK_b7c89f5cf45e4f1315700ecf4f3" FOREIGN KEY ("generalLedgerId") REFERENCES "general_ledger"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
  `ALTER TABLE "employees" ADD CONSTRAINT "FK_492e9b44dc4b19a848435f90000" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
  `ALTER TABLE "employees" ADD CONSTRAINT "FK_6fbf8b2af7b2c70118f4deab6dc" FOREIGN KEY ("subAccountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
  `ALTER TABLE "customers" ADD CONSTRAINT "FK_259d8c0f59aee13a524516a32c2" FOREIGN KEY ("physicalAddressId") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
  `ALTER TABLE "customers" ADD CONSTRAINT "FK_6009ae5745d9bd56de5b9485dfb" FOREIGN KEY ("mailingAddressId") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
  `ALTER TABLE "customers" ADD CONSTRAINT "FK_79dae01a3d96ab374d23b4fff8f" FOREIGN KEY ("company") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
  `ALTER TABLE "customers" ADD CONSTRAINT "FK_ba2d17ae126838dc4399cafcf17" FOREIGN KEY ("default_account_id") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
  `ALTER TABLE "customers" ADD CONSTRAINT "FK_5de3855d532ed2c71c2dbf2e138" FOREIGN KEY ("default_sub_account_id") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
  `ALTER TABLE "users_organizations" ADD CONSTRAINT "FK_d11c3e3a2c84172a04398937d25" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
  `ALTER TABLE "users_organizations" ADD CONSTRAINT "FK_83b955437be18ff6742c5bb6a12" FOREIGN KEY ("organizationsId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
  `ALTER TABLE "users_companies" ADD CONSTRAINT "FK_8c459ed79d9d38de0ce8ccc6bea" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
  `ALTER TABLE "users_companies" ADD CONSTRAINT "FK_f150c30a741aee239f4beea864b" FOREIGN KEY ("companiesId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
];

export class AccountingBaseline1795651200000 implements MigrationInterface {
  public async up(runner: QueryRunner): Promise<void> {
    const existing: Array<{table_name: string, column_name: string}> = await runner.query(
      "SELECT table_name, column_name FROM information_schema.columns " +
      "WHERE table_schema = current_schema() AND table_name = ANY($1::text[])",
      [Object.keys(tables)],
    );

    // Earlier releases created this schema on startup. Adopt it without issuing DDL.
    if (existing.length) {
      const present = new Set(existing.map(row => row.table_name + "." + row.column_name));
      for (const [name, table] of Object.entries(tables)) {
        for (const column of Object.keys(table.columns)) {
          if (!present.has(name + "." + column)) {
            throw new Error(`Cannot adopt an incomplete Bookkeeper schema: missing ${name}.${column}`);
          }
        }
      }
      return;
    }

    for (const [name, table] of Object.entries(tables)) {
      const columns = Object.entries(table.columns).map(([column, type]) => `"${column}" ${type}`);
      const definition = [...columns, ...table.constraints].join(", ");
      await runner.query(`CREATE TABLE "${name}" (${definition})`);
    }
    for (const sql of indexesAndForeignKeys) {
      await runner.query(sql);
    }
  }

  public async down(): Promise<void> {
    // A rollback removes the baseline marker only. These tables can predate this migration.
  }
}
