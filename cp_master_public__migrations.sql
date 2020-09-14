create table _migrations
(
    id        serial  not null
        constraint "PK_52c0aa36ad15cc87e5bab334659"
            primary key,
    timestamp bigint  not null,
    name      varchar not null
);

alter table _migrations
    owner to postgres;

INSERT INTO public._migrations (id, timestamp, name) VALUES (1, 1570439459173, 'Test1570439459173');
INSERT INTO public._migrations (id, timestamp, name) VALUES (2, 1570439621990, 'Migration1570439621990');
create table accounts
(
    id                         serial                not null
        constraint "PK_5a7a02c20412299d198e097a8fe"
            primary key,
    code                       varchar               not null,
    status                     integer default 1     not null,
    fiscal_year                integer,
    description                text                  not null,
    type                       varchar,
    restriction                varchar,
    end_year_adjustment_budget numeric(5, 2),
    is_subaccount              boolean default false not null,
    parent_id                  integer
        constraint "FK_f7ea327e4100ce4d6002ecdd12b"
            references accounts,
    company_id                 integer
        constraint "FK_b22c8136b3e83352b0013224801"
            references companies,
    is_posted                  boolean default false,
    restriction_sub_type       varchar,
    constraint "UQ_5d5037c18990a770834716861aa"
        unique (code, fiscal_year)
);

alter table accounts
    owner to postgres;

INSERT INTO public.accounts (id, code, status, fiscal_year, description, type, restriction, end_year_adjustment_budget, is_subaccount, parent_id, company_id, is_posted, restriction_sub_type) VALUES (14, 'G30', 0, 2019, 'G30', 'l', 'njt', null, false, null, 2, false, null);
INSERT INTO public.accounts (id, code, status, fiscal_year, description, type, restriction, end_year_adjustment_budget, is_subaccount, parent_id, company_id, is_posted, restriction_sub_type) VALUES (15, 'G31', 1, 2019, 'G31', 'i', 'jet', null, false, null, 2, false, null);
INSERT INTO public.accounts (id, code, status, fiscal_year, description, type, restriction, end_year_adjustment_budget, is_subaccount, parent_id, company_id, is_posted, restriction_sub_type) VALUES (17, 'G 20183', 1, 2018, 'asd', 'i', 'njt', null, false, null, 2, false, null);
INSERT INTO public.accounts (id, code, status, fiscal_year, description, type, restriction, end_year_adjustment_budget, is_subaccount, parent_id, company_id, is_posted, restriction_sub_type) VALUES (16, 'G 2019', 1, 2019, 'G 1029', 'i', 'et', null, false, null, 2, false, null);
INSERT INTO public.accounts (id, code, status, fiscal_year, description, type, restriction, end_year_adjustment_budget, is_subaccount, parent_id, company_id, is_posted, restriction_sub_type) VALUES (18, 'S14', 1, null, 'Sub Acc', null, null, null, true, null, 2, false, null);
INSERT INTO public.accounts (id, code, status, fiscal_year, description, type, restriction, end_year_adjustment_budget, is_subaccount, parent_id, company_id, is_posted, restriction_sub_type) VALUES (19, 'TTS', 1, null, 'test', null, null, null, true, 16, 2, false, null);
INSERT INTO public.accounts (id, code, status, fiscal_year, description, type, restriction, end_year_adjustment_budget, is_subaccount, parent_id, company_id, is_posted, restriction_sub_type) VALUES (20, 'S15', 1, null, 'Tsdff', null, null, null, true, 15, 2, false, null);
INSERT INTO public.accounts (id, code, status, fiscal_year, description, type, restriction, end_year_adjustment_budget, is_subaccount, parent_id, company_id, is_posted, restriction_sub_type) VALUES (22, 'AINT2', 1, 2019, 'AINT2', 'i', 'et', null, false, null, 10, false, null);
INSERT INTO public.accounts (id, code, status, fiscal_year, description, type, restriction, end_year_adjustment_budget, is_subaccount, parent_id, company_id, is_posted, restriction_sub_type) VALUES (23, 'SAINT1', 1, null, 'SAINT1', null, null, null, true, 21, 10, false, null);
INSERT INTO public.accounts (id, code, status, fiscal_year, description, type, restriction, end_year_adjustment_budget, is_subaccount, parent_id, company_id, is_posted, restriction_sub_type) VALUES (24, 'SAINT2', 1, null, 'SAINT2', null, null, null, true, null, 10, false, null);
INSERT INTO public.accounts (id, code, status, fiscal_year, description, type, restriction, end_year_adjustment_budget, is_subaccount, parent_id, company_id, is_posted, restriction_sub_type) VALUES (25, 'SAINT3', 1, null, 'SAINT3', null, null, null, true, 22, 10, false, null);
INSERT INTO public.accounts (id, code, status, fiscal_year, description, type, restriction, end_year_adjustment_budget, is_subaccount, parent_id, company_id, is_posted, restriction_sub_type) VALUES (26, 'SG2019', 1, null, 'SG 2019', null, null, null, true, 16, 2, false, null);
INSERT INTO public.accounts (id, code, status, fiscal_year, description, type, restriction, end_year_adjustment_budget, is_subaccount, parent_id, company_id, is_posted, restriction_sub_type) VALUES (27, '1600', 1, 2018, 'Construction Equipment!', 'a', null, 0.00, false, null, 10, false, null);
INSERT INTO public.accounts (id, code, status, fiscal_year, description, type, restriction, end_year_adjustment_budget, is_subaccount, parent_id, company_id, is_posted, restriction_sub_type) VALUES (21, 'AINT1', 1, 2019, 'AINT1', 'l', 'njt', null, false, null, 10, false, null);
INSERT INTO public.accounts (id, code, status, fiscal_year, description, type, restriction, end_year_adjustment_budget, is_subaccount, parent_id, company_id, is_posted, restriction_sub_type) VALUES (30, 'AINT3', 1, 2019, 'AINT3', 'l', 'jet', null, false, null, 10, false, null);
INSERT INTO public.accounts (id, code, status, fiscal_year, description, type, restriction, end_year_adjustment_budget, is_subaccount, parent_id, company_id, is_posted, restriction_sub_type) VALUES (32, '1119', 1, 2019, 'test 1119', 'a', null, 0.00, false, null, 10, false, null);
create table address
(
    id       serial  not null
        constraint "PK_d92de1f82754668b5f5f5dd4fd5"
            primary key,
    street   varchar not null,
    city     varchar not null,
    state    varchar not null,
    zip_code varchar not null,
    phone    varchar
);

alter table address
    owner to postgres;


create table addresses
(
    id       serial  not null
        constraint "PK_745d8f43d3af10ab8247465e450"
            primary key,
    street   varchar not null,
    city     varchar not null,
    state    varchar not null,
    zip_code varchar not null,
    phone    varchar
);

alter table addresses
    owner to postgres;

INSERT INTO public.addresses (id, street, city, state, zip_code, phone) VALUES (21, 'N.Ordy 45, 197', 'Minsk', 'Minsk', '22004', '+375298595616');
INSERT INTO public.addresses (id, street, city, state, zip_code, phone) VALUES (22, 'N.Ordy 45, 197', 'Minsk', 'Minsk', '22004', '+375298595616');
INSERT INTO public.addresses (id, street, city, state, zip_code, phone) VALUES (23, 'ad', 'ad', 'asd', '12332', null);
INSERT INTO public.addresses (id, street, city, state, zip_code, phone) VALUES (24, 'ad', 'ad', 'asd', '12332', null);
INSERT INTO public.addresses (id, street, city, state, zip_code, phone) VALUES (25, 'N.Ordy 45, 197', 'Minsk', 'Minsk', '22004', '+375298595616');
INSERT INTO public.addresses (id, street, city, state, zip_code, phone) VALUES (26, 'N.Ordy 45, 197', 'Minsk', 'Minsk', '22004', '+375298595616');
INSERT INTO public.addresses (id, street, city, state, zip_code, phone) VALUES (10, 'testing street', 'Buckingham, Buckinghamshire', 'Minsk', '22004', '+375298595616');
INSERT INTO public.addresses (id, street, city, state, zip_code, phone) VALUES (11, 'testing street', 'Buckingham, Buckinghamshire', 'Minsk', '22004', '+375298595616');
INSERT INTO public.addresses (id, street, city, state, zip_code, phone) VALUES (12, 'N.Ordy 45, 197', 'Minsk', 'Minsk', '22004', '+375298595616');
INSERT INTO public.addresses (id, street, city, state, zip_code, phone) VALUES (13, 'N.Ordy 45, 197', 'Minsk', 'Minsk', '22004', '+375298595616');
INSERT INTO public.addresses (id, street, city, state, zip_code, phone) VALUES (9, 'Ordy', 'Berlin', 'Berlin', '42453', '+375298595616');
INSERT INTO public.addresses (id, street, city, state, zip_code, phone) VALUES (29, 'Ordy', 'Berlin', 'Berlin', '42453', '+375298595616');
INSERT INTO public.addresses (id, street, city, state, zip_code, phone) VALUES (30, 'st. Zolny', 'Amsterdam', 'SB', '35223', null);
INSERT INTO public.addresses (id, street, city, state, zip_code, phone) VALUES (31, 'st. Zolny', 'Amsterdam', 'SB', '35223', null);
INSERT INTO public.addresses (id, street, city, state, zip_code, phone) VALUES (32, 'Test', 'City', 'State', '32433', null);
INSERT INTO public.addresses (id, street, city, state, zip_code, phone) VALUES (33, 'Test', 'City', 'State', '32433', null);
INSERT INTO public.addresses (id, street, city, state, zip_code, phone) VALUES (34, 'Street', 'City', 'State', '23434', null);
INSERT INTO public.addresses (id, street, city, state, zip_code, phone) VALUES (35, 'Street', 'City', 'State', '23434', null);
INSERT INTO public.addresses (id, street, city, state, zip_code, phone) VALUES (27, 'Doutan', 'Bosnia', 'Genric', '34252', '212-323-1231');
INSERT INTO public.addresses (id, street, city, state, zip_code, phone) VALUES (28, 'Doutan', 'Bosnia', 'Genric', '34252', '212-323-1231');
INSERT INTO public.addresses (id, street, city, state, zip_code, phone) VALUES (36, 'N.Ordy 45, 197', 'Minsk', 'Minsk!', '22004', '213-123-2312');
INSERT INTO public.addresses (id, street, city, state, zip_code, phone) VALUES (37, 'N.Ordy 45, 197', 'Minsk', 'Minsk!', '22004', '213-123-2312');
create table companies
(
    id                              serial                not null
        constraint "PK_d4bc3e82a314fa9e29f652c2c22"
            primary key,
    code                            varchar               not null
        constraint "UQ_80af3e6808151c3210b4d5a2185"
            unique,
    status                          integer default 1     not null,
    name                            varchar               not null,
    license_number                  varchar,
    default_withholding_state_code  varchar,
    default_withholding_local1_code varchar,
    default_withholding_local2_code varchar,
    is_multiple_local_taxation      boolean default false not null,
    "organizationId"                integer
        constraint "FK_cfa7d558ce458748965fca390d6"
            references organizations,
    is_deleted                      boolean default false not null,
    "physicalAddressId"             integer
        constraint "UQ_1538348ba37acb2e455048f1b6b"
            unique
        constraint "FK_1538348ba37acb2e455048f1b6b"
            references addresses
            on delete cascade,
    "mailingAddressId"              integer
        constraint "UQ_8acdea6d08f18baa9b35f1b0ace"
            unique
        constraint "FK_8acdea6d08f18baa9b35f1b0ace"
            references addresses
            on delete cascade,
    country                         varchar
);

alter table companies
    owner to postgres;

INSERT INTO public.companies (id, code, status, name, license_number, default_withholding_state_code, default_withholding_local1_code, default_withholding_local2_code, is_multiple_local_taxation, "organizationId", is_deleted, "physicalAddressId", "mailingAddressId", country) VALUES (4, 'cmp2', 1, 'My Second company', 'adsa24asdf241', 'CA', 'RE', 'PE', false, 1, false, null, null, null);
INSERT INTO public.companies (id, code, status, name, license_number, default_withholding_state_code, default_withholding_local1_code, default_withholding_local2_code, is_multiple_local_taxation, "organizationId", is_deleted, "physicalAddressId", "mailingAddressId", country) VALUES (10, 'INTL', 1, 'Alex Intl Company', 'k3352RT5252d', null, null, null, false, 11, false, null, null, null);
INSERT INTO public.companies (id, code, status, name, license_number, default_withholding_state_code, default_withholding_local1_code, default_withholding_local2_code, is_multiple_local_taxation, "organizationId", is_deleted, "physicalAddressId", "mailingAddressId", country) VALUES (17, 'asdsd', 1, '23234234', '23123123123231', null, null, null, false, 39, false, null, null, null);
INSERT INTO public.companies (id, code, status, name, license_number, default_withholding_state_code, default_withholding_local1_code, default_withholding_local2_code, is_multiple_local_taxation, "organizationId", is_deleted, "physicalAddressId", "mailingAddressId", country) VALUES (2, 'cmp1', 1, 'Organization 3', 'adsa24asdf241', 'CA', 'RE', 'PE', false, 11, false, 36, 37, 'Belarus');
INSERT INTO public.companies (id, code, status, name, license_number, default_withholding_state_code, default_withholding_local1_code, default_withholding_local2_code, is_multiple_local_taxation, "organizationId", is_deleted, "physicalAddressId", "mailingAddressId", country) VALUES (11, 'AFC', 1, 'Alan First Company', '324sad324235235', null, null, null, false, 30, false, null, null, null);
INSERT INTO public.companies (id, code, status, name, license_number, default_withholding_state_code, default_withholding_local1_code, default_withholding_local2_code, is_multiple_local_taxation, "organizationId", is_deleted, "physicalAddressId", "mailingAddressId", country) VALUES (12, 'TFC', 1, 'Trial First company', '42342342342343242432', null, null, null, false, 35, false, null, null, null);
INSERT INTO public.companies (id, code, status, name, license_number, default_withholding_state_code, default_withholding_local1_code, default_withholding_local2_code, is_multiple_local_taxation, "organizationId", is_deleted, "physicalAddressId", "mailingAddressId", country) VALUES (13, 'AFCC', 1, 'Art First company', '324233434324', null, null, null, false, 36, false, null, null, null);
INSERT INTO public.companies (id, code, status, name, license_number, default_withholding_state_code, default_withholding_local1_code, default_withholding_local2_code, is_multiple_local_taxation, "organizationId", is_deleted, "physicalAddressId", "mailingAddressId", country) VALUES (14, 'RCF', 1, 'Russ Company First', '23423434234', null, null, null, false, 37, false, null, null, null);
INSERT INTO public.companies (id, code, status, name, license_number, default_withholding_state_code, default_withholding_local1_code, default_withholding_local2_code, is_multiple_local_taxation, "organizationId", is_deleted, "physicalAddressId", "mailingAddressId", country) VALUES (15, 'RS', 1, 'Russ Second', '3423434234', null, null, null, false, 37, false, null, null, null);
create table customers
(
    id                              serial            not null
        constraint "PK_133ec679a801fab5e070f73d3ea"
            primary key,
    code                            varchar           not null,
    status                          integer default 1 not null,
    name                            varchar           not null,
    address                         varchar,
    contact_person                  varchar,
    invoice_terms_message           varchar,
    current_year_billings           numeric(15, 2),
    last_year_billings              numeric(15, 2),
    default_sales_tax_rate          numeric(15, 2),
    default_sales_tax_state_code    varchar,
    default_sales_tax_district_code varchar,
    this_year_billings              numeric(15, 2),
    to_date_billings                numeric(15, 2),
    is_exempt_for_late_fee          boolean default false,
    contact_email                   varchar,
    is_print_statements             boolean default false,
    "physicalAddressId"             integer
        constraint "UQ_259d8c0f59aee13a524516a32c2"
            unique
        constraint "FK_259d8c0f59aee13a524516a32c2"
            references addresses
            on delete cascade,
    "mailingAddressId"              integer
        constraint "UQ_6009ae5745d9bd56de5b9485dfb"
            unique
        constraint "FK_6009ae5745d9bd56de5b9485dfb"
            references addresses
            on delete cascade,
    company                         integer
        constraint "FK_79dae01a3d96ab374d23b4fff8f"
            references companies,
    default_account_id              integer
        constraint "FK_ba2d17ae126838dc4399cafcf17"
            references accounts,
    default_sub_account_id          integer
        constraint "FK_5de3855d532ed2c71c2dbf2e138"
            references accounts,
    last_payment_date               timestamp
);

alter table customers
    owner to postgres;

INSERT INTO public.customers (id, code, status, name, address, contact_person, invoice_terms_message, current_year_billings, last_year_billings, default_sales_tax_rate, default_sales_tax_state_code, default_sales_tax_district_code, this_year_billings, to_date_billings, is_exempt_for_late_fee, contact_email, is_print_statements, "physicalAddressId", "mailingAddressId", company, default_account_id, default_sub_account_id, last_payment_date) VALUES (9, 'test', 1, 'sadasd', null, 'asdasd', 'sasdasdas', null, 324324.00, 324.00, '44', '4234', 234.00, 234234234.00, false, 'asdasdas@sasad.sdfsd', false, null, null, 10, null, null, null);
INSERT INTO public.customers (id, code, status, name, address, contact_person, invoice_terms_message, current_year_billings, last_year_billings, default_sales_tax_rate, default_sales_tax_state_code, default_sales_tax_district_code, this_year_billings, to_date_billings, is_exempt_for_late_fee, contact_email, is_print_statements, "physicalAddressId", "mailingAddressId", company, default_account_id, default_sub_account_id, last_payment_date) VALUES (10, 'resad', 1, 'asdasd', null, 'asdasd', 'asdsdsd', null, 3.00, 23.00, '3', '3', 3.00, 3.00, false, 'asdasd', false, null, null, 10, null, null, null);
INSERT INTO public.customers (id, code, status, name, address, contact_person, invoice_terms_message, current_year_billings, last_year_billings, default_sales_tax_rate, default_sales_tax_state_code, default_sales_tax_district_code, this_year_billings, to_date_billings, is_exempt_for_late_fee, contact_email, is_print_statements, "physicalAddressId", "mailingAddressId", company, default_account_id, default_sub_account_id, last_payment_date) VALUES (11, 'resad', 1, 'asdasd', null, 'asdasd', 'asdsdsd', null, 3.00, 23.00, '3', '3', 3.00, 3.00, false, 'asdasd', false, null, null, 10, null, null, null);
INSERT INTO public.customers (id, code, status, name, address, contact_person, invoice_terms_message, current_year_billings, last_year_billings, default_sales_tax_rate, default_sales_tax_state_code, default_sales_tax_district_code, this_year_billings, to_date_billings, is_exempt_for_late_fee, contact_email, is_print_statements, "physicalAddressId", "mailingAddressId", company, default_account_id, default_sub_account_id, last_payment_date) VALUES (12, 'resad', 1, 'asdasd', null, 'asdasd', 'asdsdsd', null, 3.00, 23.00, '3', '3', 3.00, 3.00, false, 'asdasd', false, null, null, 10, null, null, null);
INSERT INTO public.customers (id, code, status, name, address, contact_person, invoice_terms_message, current_year_billings, last_year_billings, default_sales_tax_rate, default_sales_tax_state_code, default_sales_tax_district_code, this_year_billings, to_date_billings, is_exempt_for_late_fee, contact_email, is_print_statements, "physicalAddressId", "mailingAddressId", company, default_account_id, default_sub_account_id, last_payment_date) VALUES (8, 'TC', 1, 'Test customer', null, 'Test Contanct', 'asdasdasd', null, 3.00, 213.00, '3', '3', 123.00, 3.00, true, 'contact@gmai.com', false, null, null, 10, 22, 23, null);
INSERT INTO public.customers (id, code, status, name, address, contact_person, invoice_terms_message, current_year_billings, last_year_billings, default_sales_tax_rate, default_sales_tax_state_code, default_sales_tax_district_code, this_year_billings, to_date_billings, is_exempt_for_late_fee, contact_email, is_print_statements, "physicalAddressId", "mailingAddressId", company, default_account_id, default_sub_account_id, last_payment_date) VALUES (13, 'CM1', 1, 'Customer 23', null, 'Alex N.', 'Some customers terms here', null, 234.00, 12.00, 'CP', 'LM', 234.00, 33.00, true, 'alex.mail.com', false, null, null, 10, 21, 23, null);
INSERT INTO public.customers (id, code, status, name, address, contact_person, invoice_terms_message, current_year_billings, last_year_billings, default_sales_tax_rate, default_sales_tax_state_code, default_sales_tax_district_code, this_year_billings, to_date_billings, is_exempt_for_late_fee, contact_email, is_print_statements, "physicalAddressId", "mailingAddressId", company, default_account_id, default_sub_account_id, last_payment_date) VALUES (14, 'MILPAR', 1, 'Millbrook Partners, Ltd.', null, 'Dave Johanson', 'Payable Upon Receipt of Invoice', 132183.00, 0.00, 0.00, 'CA', 'LOSA', 546265.00, 546265.00, true, 'Millbrook Partners, Ltd.', true, null, null, 10, 27, null, null);
create table employees
(
    city                                      varchar               not null,
    zip_code                                  varchar,
    zip_code_ext                              varchar,
    tel_area_code                             integer,
    tel_prefix                                integer               not null,
    tel_number                                integer               not null,
    license_number                            varchar,
    fax_area_code                             integer,
    fax_prefix                                integer,
    fax_number                                varchar,
    id                                        serial                not null
        constraint "PK_b9535a98350d5b26e7eb0c26af4"
            primary key,
    code                                      varchar               not null,
    status                                    varchar               not null,
    name                                      varchar               not null,
    "addressLine1"                            varchar               not null,
    "addressLine2"                            varchar,
    ssn                                       varchar               not null,
    minority                                  varchar,
    gender                                    varchar               not null,
    has_pension_plan                          boolean               not null,
    birthday                                  date                  not null,
    hire_date                                 date                  not null,
    termination_date                          date,
    rehire_date                               date,
    other_date                                date,
    state_withholding_code                    varchar               not null,
    payment_frequency                         varchar               not null,
    is_excluded_certified_payroll             boolean               not null,
    federal_withholding_allowances            integer,
    federal_withholding_tax_adjustment        varchar,
    federal_withholding_tax_amount            numeric(5, 2),
    salary_amount                             numeric(5, 2),
    print_details_check_stub                  boolean               not null,
    driver_license                            varchar,
    work_permit                               varchar,
    work_permit_expire_date                   date,
    is_union_job_override_allowed             boolean               not null,
    is_work_comp_job_override_allowed         boolean               not null,
    is_general_liability_job_override_allowed boolean               not null,
    last_check_date                           date,
    department                                varchar,
    default_cost                              varchar,
    default_phase                             varchar,
    default_job                               varchar,
    union_code                                varchar,
    general_liability_code                    varchar,
    worker_comp_code                          varchar               not null,
    "accountId"                               integer
        constraint "FK_492e9b44dc4b19a848435f90000"
            references accounts,
    "subAccountId"                            integer
        constraint "FK_6fbf8b2af7b2c70118f4deab6dc"
            references accounts,
    state_sui_sdi_code                        varchar               not null,
    local_taxes_code                          varchar,
    tel_area_code_2                           integer,
    tel_prefix_2                              integer               not null,
    tel_number_2                              integer               not null,
    craft_code                                varchar               not null,
    federal_status                            varchar               not null,
    is_deleted                                boolean default false not null
);

alter table employees
    owner to postgres;


create table general_ledger
(
    id                              serial        not null
        constraint "PK_a148029e2181866d8a7fe139981"
            primary key,
    period_1_status                 integer       not null,
    period_2_status                 integer       not null,
    period_3_status                 integer       not null,
    period_4_status                 integer       not null,
    period_5_status                 integer       not null,
    period_6_status                 integer       not null,
    period_7_status                 integer       not null,
    period_8_status                 integer       not null,
    period_9_status                 integer       not null,
    period_10_status                integer       not null,
    period_11_status                integer       not null,
    period_12_status                integer       not null,
    current_fiscal_year             integer       not null,
    is_prior_fiscal_year_closed     boolean       not null,
    current_fiscal_year_opened      date          not null,
    current_bank_balance            numeric(5, 2) not null,
    "retainedEarningsAccountId"     integer
        constraint "FK_cc6fea5ba6feeab5a5c88261e28"
            references accounts,
    "retainedEarningsSubAccountId"  integer
        constraint "FK_a324704c327443c981e509fe405"
            references accounts,
    "companyId"                     integer
        constraint "FK_a3856d6d7c54cf86e39701d616a"
            references companies,
    calendar_year_period_1          integer,
    period_1_month                  varchar       not null,
    period_2_month                  varchar       not null,
    period_3_month                  varchar       not null,
    period_4_month                  varchar       not null,
    period_5_month                  varchar       not null,
    period_6_month                  varchar       not null,
    period_7_month                  varchar       not null,
    period_8_month                  varchar       not null,
    period_9_month                  varchar       not null,
    period_10_month                 varchar       not null,
    period_11_month                 varchar       not null,
    period_12_month                 varchar       not null,
    last_journal_posted             integer,
    last_fiscal_year_posted         integer,
    last_fiscal_period_posted       integer,
    last_fiscal_year_balance_posted varchar,
    reconciliation_date             varchar,
    "calYearOf1stPerOfFiscalYear"   varchar,
    constraint "UQ_86c5e34eb7e155c7f8247927bba"
        unique ("companyId", current_fiscal_year)
);

alter table general_ledger
    owner to postgres;

INSERT INTO public.general_ledger (id, period_1_status, period_2_status, period_3_status, period_4_status, period_5_status, period_6_status, period_7_status, period_8_status, period_9_status, period_10_status, period_11_status, period_12_status, current_fiscal_year, is_prior_fiscal_year_closed, current_fiscal_year_opened, current_bank_balance, "retainedEarningsAccountId", "retainedEarningsSubAccountId", company_id, calendar_year_period_1, period_1_month, period_2_month, period_3_month, period_4_month, period_5_month, period_6_month, period_7_month, period_8_month, period_9_month, period_10_month, period_11_month, period_12_month, last_journal_posted, last_fiscal_year_posted, last_fiscal_period_posted, last_fiscal_year_balance_posted, reconciliation_date, "calYearOf1stPerOfFiscalYear") VALUES (17, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 2019, false, '2019-11-06', 0.00, 16, 19, 2, 2019, '4', '5', '6', '7', '8', '9', '10', '11', '12', '1', '2', '3', null, null, null, null, null, null);
INSERT INTO public.general_ledger (id, period_1_status, period_2_status, period_3_status, period_4_status, period_5_status, period_6_status, period_7_status, period_8_status, period_9_status, period_10_status, period_11_status, period_12_status, current_fiscal_year, is_prior_fiscal_year_closed, current_fiscal_year_opened, current_bank_balance, "retainedEarningsAccountId", "retainedEarningsSubAccountId", company_id, calendar_year_period_1, period_1_month, period_2_month, period_3_month, period_4_month, period_5_month, period_6_month, period_7_month, period_8_month, period_9_month, period_10_month, period_11_month, period_12_month, last_journal_posted, last_fiscal_year_posted, last_fiscal_period_posted, last_fiscal_year_balance_posted, reconciliation_date, "calYearOf1stPerOfFiscalYear") VALUES (18, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2019, false, '2019-11-07', 0.00, 21, 25, 17, 2019, '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', null, null, null, null, null, null);
INSERT INTO public.general_ledger (id, period_1_status, period_2_status, period_3_status, period_4_status, period_5_status, period_6_status, period_7_status, period_8_status, period_9_status, period_10_status, period_11_status, period_12_status, current_fiscal_year, is_prior_fiscal_year_closed, current_fiscal_year_opened, current_bank_balance, "retainedEarningsAccountId", "retainedEarningsSubAccountId", company_id, calendar_year_period_1, period_1_month, period_2_month, period_3_month, period_4_month, period_5_month, period_6_month, period_7_month, period_8_month, period_9_month, period_10_month, period_11_month, period_12_month, last_journal_posted, last_fiscal_year_posted, last_fiscal_period_posted, last_fiscal_year_balance_posted, reconciliation_date, "calYearOf1stPerOfFiscalYear") VALUES (33, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2019, false, '2019-11-23', 0.00, 27, null, 10, null, '10', '11', '12', '1', '2', '3', '4', '5', '6', '7', '8', '9', 9, 2018, 1, '2019', '090119', '2018');
create table general_ledger_accounts_budget
(
    id                serial         not null
        constraint "PK_a93ca38a6da56b05b20f18b94f0"
            primary key,
    period_1_budget   numeric(20, 2) not null,
    period_2_budget   numeric(20, 2) not null,
    period_3_budget   numeric(20, 2) not null,
    period_4_budget   numeric(20, 2) not null,
    period_5_budget   numeric(20, 2) not null,
    period_6_budget   numeric(20, 2) not null,
    period_7_budget   numeric(20, 2) not null,
    period_8_budget   numeric(20, 2) not null,
    period_9_budget   numeric(20, 2) not null,
    period_10_budget  numeric(20, 2) not null,
    period_11_budget  numeric(20, 2) not null,
    period_12_budget  numeric(20, 2) not null,
    "accountId"       integer
        constraint "FK_56d0cf4e57f54801a7bd68c7978"
            references accounts
            on delete cascade,
    "generalLedgerId" integer
        constraint "FK_b7c89f5cf45e4f1315700ecf4f3"
            references general_ledger,
    constraint "UQ_bad7d9089fd63d5dca251f9d08d"
        unique ("accountId", "generalLedgerId")
);

alter table general_ledger_accounts_budget
    owner to postgres;

INSERT INTO public.general_ledger_accounts_budget (id, period_1_budget, period_2_budget, period_3_budget, period_4_budget, period_5_budget, period_6_budget, period_7_budget, period_8_budget, period_9_budget, period_10_budget, period_11_budget, period_12_budget, "accountId", "generalLedgerId") VALUES (8, 44.00, 2.00, 3.00, 4.00, 213.00, 42.00, 2.00, 3.00, 213.00, 123.00, 213.00, 12.00, 14, null);
INSERT INTO public.general_ledger_accounts_budget (id, period_1_budget, period_2_budget, period_3_budget, period_4_budget, period_5_budget, period_6_budget, period_7_budget, period_8_budget, period_9_budget, period_10_budget, period_11_budget, period_12_budget, "accountId", "generalLedgerId") VALUES (9, 41.67, 41.67, 41.67, 41.67, 41.67, 41.67, 41.67, 41.67, 1.00, 41.67, 41.67, 41.67, 19, null);
INSERT INTO public.general_ledger_accounts_budget (id, period_1_budget, period_2_budget, period_3_budget, period_4_budget, period_5_budget, period_6_budget, period_7_budget, period_8_budget, period_9_budget, period_10_budget, period_11_budget, period_12_budget, "accountId", "generalLedgerId") VALUES (10, 1000.00, 1000.00, 1000.00, 1000.00, 1000.00, 1000.00, 12000.00, 1000.00, 1000.00, 1000.00, 1000.00, 1000.00, 25, null);
INSERT INTO public.general_ledger_accounts_budget (id, period_1_budget, period_2_budget, period_3_budget, period_4_budget, period_5_budget, period_6_budget, period_7_budget, period_8_budget, period_9_budget, period_10_budget, period_11_budget, period_12_budget, "accountId", "generalLedgerId") VALUES (11, 10.00, 10.00, 12.00, 10.00, 10.00, 10.00, 10.00, 10.00, 10.00, 10.00, 10.00, 10.00, 23, null);
INSERT INTO public.general_ledger_accounts_budget (id, period_1_budget, period_2_budget, period_3_budget, period_4_budget, period_5_budget, period_6_budget, period_7_budget, period_8_budget, period_9_budget, period_10_budget, period_11_budget, period_12_budget, "accountId", "generalLedgerId") VALUES (12, 1000.00, 1000.00, 1000.00, 1000.00, 1000.00, 1100.00, 1000.00, 1000.00, 1000.00, 1000.00, 1000.00, 1000.00, 26, null);
create table gl_periods
(
    id          serial  not null
        constraint "PK_37e421d31035fb8c99257009a24"
            primary key,
    name        varchar not null,
    number      integer not null,
    fiscal_year integer not null,
    constraint "UQ_0fbf23c55cafb5e7ea0183deeec"
        unique (number, fiscal_year)
);

alter table gl_periods
    owner to postgres;


create table organizations
(
    id                  serial                not null
        constraint "PK_6b031fcd0863e3f6b44230163f9"
            primary key,
    name                varchar               not null
        constraint "UQ_9b7ca6d30b94fef571cff876884"
            unique,
    is_deleted          boolean default false not null,
    status              integer default 1     not null,
    description         text,
    "physicalAddressId" integer
        constraint "UQ_3996585ba00b1cf23abedfc26ba"
            unique
        constraint "FK_3996585ba00b1cf23abedfc26ba"
            references addresses
            on delete cascade,
    "mailingAddressId"  integer
        constraint "UQ_d230e0bc4768c0bc34f40745b13"
            unique
        constraint "FK_d230e0bc4768c0bc34f40745b13"
            references addresses
            on delete cascade
);

alter table organizations
    owner to postgres;

INSERT INTO public.organizations (id, name, is_deleted, status, description, "physicalAddressId", "mailingAddressId") VALUES (10, 'KFC', false, 1, 'KFC', 10, 11);
INSERT INTO public.organizations (id, name, is_deleted, status, description, "physicalAddressId", "mailingAddressId") VALUES (12, 'Primary Family', false, 1, 'Primary Family', 12, 13);
INSERT INTO public.organizations (id, name, is_deleted, status, description, "physicalAddressId", "mailingAddressId") VALUES (29, 'Martin''s and CO', false, 1, 'Martin''s and CO', 27, 28);
INSERT INTO public.organizations (id, name, is_deleted, status, description, "physicalAddressId", "mailingAddressId") VALUES (2, 'McDonalds', false, 1, 'McDonalds', null, null);
INSERT INTO public.organizations (id, name, is_deleted, status, description, "physicalAddressId", "mailingAddressId") VALUES (1, 'Samon Bill', false, 1, 'Samon Bill', null, null);
INSERT INTO public.organizations (id, name, is_deleted, status, description, "physicalAddressId", "mailingAddressId") VALUES (11, 'Alexx & Co', false, 1, 'Aladan & Co', 9, 29);
INSERT INTO public.organizations (id, name, is_deleted, status, description, "physicalAddressId", "mailingAddressId") VALUES (30, 'Alan''s Organization', false, 1, 'Alan''s Organization', null, null);
INSERT INTO public.organizations (id, name, is_deleted, status, description, "physicalAddressId", "mailingAddressId") VALUES (35, 'Trial Think', true, 1, 'Things for your mind', 30, 31);
INSERT INTO public.organizations (id, name, is_deleted, status, description, "physicalAddressId", "mailingAddressId") VALUES (36, 'Arts galery', false, 1, 'Arts galery', null, null);
INSERT INTO public.organizations (id, name, is_deleted, status, description, "physicalAddressId", "mailingAddressId") VALUES (37, 'New org for Russ', false, 1, 'New org for Russ', 32, 33);
INSERT INTO public.organizations (id, name, is_deleted, status, description, "physicalAddressId", "mailingAddressId") VALUES (38, 'Test', true, 1, 'Test', null, null);
INSERT INTO public.organizations (id, name, is_deleted, status, description, "physicalAddressId", "mailingAddressId") VALUES (39, 'Adrian''s company', false, 1, null, 34, 35);
create table raw_accounts
(
    id       serial not null
        constraint "PK_18899d9747a969fcc635b29cd0e"
            primary key,
    value    jsonb,
    relation integer
        constraint "REL_f2ca66ddcc9e1a984811ff5519"
            unique
        constraint "FK_f2ca66ddcc9e1a984811ff55193"
            references accounts
);

alter table raw_accounts
    owner to postgres;

INSERT INTO public.raw_accounts (id, value, relation) VALUES (1, '{"Status": " ", "Future1": " ", "JobFlag": " ", "FiscalYear": "aa", "AccountType": "A", "Description": "test 1119                ", "PostingFlag": " ", "RecordStatus": " ", "SortedRecNum": "0", "FiscalCentury": "20", "GLAccountCode": "1119", "PhysRecordNum": "2196", "Period0AmountToDate": "0", "Period1AmountToDate": "0", "Period2AmountToDate": "0", "Period3AmountToDate": "0", "Period4AmountToDate": "0", "Period5AmountToDate": "0", "Period6AmountToDate": "0", "Period7AmountToDate": "0", "Period8AmountToDate": "0", "Period9AmountToDate": "0", "Period10AmountToDate": "0", "Period11AmountToDate": "0", "Period12AmountToDate": "0", "JobCostOrIncomeTypeFlag": " ", "Period13YearEndAdjAmntToDate": "0"}', 32);
create table raw_general_ledger
(
    id       serial not null
        constraint "PK_d97f6967a232bc18fcdd3802f50"
            primary key,
    value    jsonb,
    relation integer
        constraint "REL_20bc43d9901dfe3b746cfa48b4"
            unique
        constraint "FK_20bc43d9901dfe3b746cfa48b4d"
            references general_ledger
);

alter table raw_general_ledger
    owner to postgres;

INSERT INTO public.raw_general_ledger (id, value, relation) VALUES (1, '{"VersionCode": "|D|", "SortedRecNum": "1", "Period1Status": "", "Period2Status": "", "Period3Status": "", "Period4Status": "", "Period5Status": "", "Period6Status": "", "Period7Status": "", "Period8Status": "", "Period9Status": "", "Period10Status": "", "Period11Status": "", "Period12Status": "", "CurrentFiscalYear": "2019", "PriorFYStatusFlag": "", "CurrentBankRecDate": "090119", "Period1Description": "October", "Period2Description": "November", "Period3Description": "December", "Period4Description": "January", "Period5Description": "February", "Period6Description": "March", "Period7Description": "April", "Period8Description": "May", "Period9Description": "June", "RetEarningsAccount": "1600", "RetEarningsSubAcnt": "", "CurBankStatementBal": "0", "Period10Description": "July", "Period11Description": "August", "Period12Description": "September", "LastJournalNumPosted": "9", "DateCurrentFYWasOpened": "100617", "LastFiscalYearGLPosted": "2018", "LastFiscalPeriodGLPosted": "1", "CalYearOf1stPerOfFiscalYear": "2018", "LastFiscalYearOperBalPosted": "2019"}', 33);
create table roles
(
    id               serial  not null
        constraint "PK_c1433d71a4838793a49dcad46ab"
            primary key,
    name             varchar not null,
    description      varchar,
    "organizationId" integer
        constraint "FK_0933e1dfb2993d672af1a98f08e"
            references organizations
            on delete cascade,
    p_general_ledger text[],
    p_job_cost       text[],
    constraint "UQ_d27a5e69fb41256abed347a85eb"
        unique (name, "organizationId")
);

alter table roles
    owner to postgres;

INSERT INTO public.roles (id, name, description, "organizationId", p_general_ledger, p_job_cost) VALUES (2, 'Manager', 'Manager Role', 11, '{delete}', null);
INSERT INTO public.roles (id, name, description, "organizationId", p_general_ledger, p_job_cost) VALUES (1, 'Accountant', 'Accountant Role', 11, '{read,write}', '{read}');
INSERT INTO public.roles (id, name, description, "organizationId", p_general_ledger, p_job_cost) VALUES (4, 'Accountant', 'Accountant Role', 30, '{read,write}', '{read}');
INSERT INTO public.roles (id, name, description, "organizationId", p_general_ledger, p_job_cost) VALUES (5, 'Manager', 'Manager Role', 30, '{delete}', null);
INSERT INTO public.roles (id, name, description, "organizationId", p_general_ledger, p_job_cost) VALUES (8, 'Manager', 'Manager Role', 35, '{delete}', null);
INSERT INTO public.roles (id, name, description, "organizationId", p_general_ledger, p_job_cost) VALUES (9, 'Accountant', 'Accountant Role', 35, '{read,write}', '{read}');
INSERT INTO public.roles (id, name, description, "organizationId", p_general_ledger, p_job_cost) VALUES (10, 'Manager', 'Manager Role', 36, '{delete}', null);
INSERT INTO public.roles (id, name, description, "organizationId", p_general_ledger, p_job_cost) VALUES (11, 'Accountant', 'Accountant Role', 36, '{read,write}', '{read}');
INSERT INTO public.roles (id, name, description, "organizationId", p_general_ledger, p_job_cost) VALUES (12, 'Manager', 'Manager Role', 37, '{delete}', null);
INSERT INTO public.roles (id, name, description, "organizationId", p_general_ledger, p_job_cost) VALUES (13, 'Accountant', 'Accountant Role', 37, '{read,write}', '{read}');
INSERT INTO public.roles (id, name, description, "organizationId", p_general_ledger, p_job_cost) VALUES (17, 'Manager', 'Test', 39, '{create,read,delete}', '{update,read}');
INSERT INTO public.roles (id, name, description, "organizationId", p_general_ledger, p_job_cost) VALUES (18, 'Accountant', 'Accountant', 39, '{create,read,update,delete}', '');
create table user_company_roles
(
    id         serial not null
        constraint "PK_508675bf8cda811ec8ff812e337"
            primary key,
    role_id    integer
        constraint "FK_18b466d671b0dcbb3b03d49024a"
            references roles,
    company_id integer
        constraint "FK_654e9d34514abfea52930f5da5c"
            references companies,
    user_id    integer
        constraint "FK_a283a1b87bf6a29f9e3667186d0"
            references users
            on delete cascade,
    constraint "UQ_a6706215e3e6e3a17fab4e80fe3"
        unique (role_id, company_id, user_id)
);

alter table user_company_roles
    owner to postgres;

INSERT INTO public.user_company_roles (id, role_id, company_id, user_id) VALUES (79, 1, 10, 87);
INSERT INTO public.user_company_roles (id, role_id, company_id, user_id) VALUES (80, 1, 2, 87);
INSERT INTO public.user_company_roles (id, role_id, company_id, user_id) VALUES (81, 1, 10, 88);
INSERT INTO public.user_company_roles (id, role_id, company_id, user_id) VALUES (82, 1, 2, 88);
INSERT INTO public.user_company_roles (id, role_id, company_id, user_id) VALUES (83, 1, 10, 90);
INSERT INTO public.user_company_roles (id, role_id, company_id, user_id) VALUES (84, 1, 2, 90);
create table users
(
    id                    serial                not null
        constraint "PK_a3ffb1c0c8416b9fc6f907b7433"
            primary key,
    username              varchar               not null
        constraint "UQ_fe0bb3f6520ee0469504521e710"
            unique,
    password              varchar,
    is_deleted            boolean default false not null,
    first_name            varchar               not null,
    last_name             varchar               not null,
    middle_name           varchar,
    suffix                varchar,
    email                 varchar               not null
        constraint "UQ_97672ac88f789774dd47f7c8be3"
            unique,
    phone                 varchar,
    roles                 text[],
    last_login            timestamp(6) with time zone,
    status                integer default 1     not null,
    password_token        varchar,
    last_company_selected integer
        constraint "FK_00b65ac9d3ff31355a3ba2be570"
            references companies
            on delete cascade
);

alter table users
    owner to postgres;

INSERT INTO public.users (id, username, password, is_deleted, first_name, last_name, middle_name, suffix, email, phone, roles, last_login, status, password_token, last_company_selected) VALUES (85, 'adsad', null, false, 'asdasd', 'adasdasd', null, null, 'asdas@asd.ad', '213-131-2131', '', null, 1, '4bbead3f9b7bc6acd0de31ebfc420a8e40b1dc5c93209be4f282119b3b0c36ddba2188d153251a522bffb1bfd2a5e5e2', null);
INSERT INTO public.users (id, username, password, is_deleted, first_name, last_name, middle_name, suffix, email, phone, roles, last_login, status, password_token, last_company_selected) VALUES (84, 'kfc_plain', null, false, 'Plain', 'User KFC', null, null, 'assd@asdasd.asd', null, '', null, 1, 'd58a89e2126b38bc80ee3af7436c56253077822149316fbff79b09e884e7c9056b18f243cfe8e73e56e02cd6ab51faaf', null);
INSERT INTO public.users (id, username, password, is_deleted, first_name, last_name, middle_name, suffix, email, phone, roles, last_login, status, password_token, last_company_selected) VALUES (87, 'admin', '$2b$10$clHYYnmFeDY1f6dFbUKWUuJxOQPECQIw1ZBjHcfenznPAdeWkeOWC', false, 'Alex', 'Admin', null, null, 'alexadmin@gmail.com', null, '{ADMINISTRATOR}', '2019-11-23 09:15:13.642000', 1, '9c15e022fa72bce787ad1873772aa714ce093d16d47ef3b4a173a71caf559af8c35ad8afe364d7372d0140145abaddd0', null);
INSERT INTO public.users (id, username, password, is_deleted, first_name, last_name, middle_name, suffix, email, phone, roles, last_login, status, password_token, last_company_selected) VALUES (88, 'alexaccountant', '$2b$10$clHYYnmFeDY1f6dFbUKWUuJxOQPECQIw1ZBjHcfenznPAdeWkeOWC', false, 'Alex!!', 'Accountant', null, null, 'alexaccountant@gmail.com', '232-343-4423', '', '2019-11-23 09:16:44.176000', 1, '0e1b902a57c525d8cf747971460f065e1f1a8c557e2652b8abb495f13c59a1417a45df0264cbe119a37caaaf6a05fd05', 10);
INSERT INTO public.users (id, username, password, is_deleted, first_name, last_name, middle_name, suffix, email, phone, roles, last_login, status, password_token, last_company_selected) VALUES (83, 'kfc_admin', '$2b$10$clHYYnmFeDY1f6dFbUKWUuJxOQPECQIw1ZBjHcfenznPAdeWkeOWC', false, 'KFC', 'Admin', null, null, 'a.dolbik@flatlogic.com', '213-123-1232', '{ADMINISTRATOR}', null, 1, '91bcde05a768d92dfe6b4e88b46e5d19b6eb8c54f31b3ab7515753449a4ab16e4dff4a0adfe14ddb5d0f50117f8e19bd', null);
INSERT INTO public.users (id, username, password, is_deleted, first_name, last_name, middle_name, suffix, email, phone, roles, last_login, status, password_token, last_company_selected) VALUES (86, 'asdasdasdasd', '$2b$10$iqLQW0zY4LJmIEvDXE5xn.L5GSDosRsGdCKhXoKSc8Qwrlq0x7Baq', false, 'asdads', 'asd', null, null, 'adsa@asdasd.ad', '213-213-1231', '{ADMINISTRATOR}', '2019-10-30 20:32:45.356000', 1, null, null);
INSERT INTO public.users (id, username, password, is_deleted, first_name, last_name, middle_name, suffix, email, phone, roles, last_login, status, password_token, last_company_selected) VALUES (90, 'alex_acc_2', '$2b$10$WCa67qQH1B46/GR7yJTIb./SOYzYZ6qFzHkM0x2HbxekVcocezbcG', false, 'Alex', 'Accountant 2E', null, null, 'alex_acc_2@gmail.com', null, '', '2019-11-08 12:09:34.731000', 0, '61ce13f9073b5003205381af6861dd4f97f4eee67b4699cad9c709ee8f99eefadc63ce89924a4749c15756f076b23cc5', 10);
INSERT INTO public.users (id, username, password, is_deleted, first_name, last_name, middle_name, suffix, email, phone, roles, last_login, status, password_token, last_company_selected) VALUES (14, 'superUser', '$2b$10$clHYYnmFeDY1f6dFbUKWUuJxOQPECQIw1ZBjHcfenznPAdeWkeOWC', false, 'Super', 'User', '', null, 'alexandr.dolbik@gmail.com', '+375298595617', '{SUPER_USER}', '2019-11-10 08:57:02.508000', 1, null, null);
create table users_companies
(
    "usersId"     integer not null
        constraint "FK_8c459ed79d9d38de0ce8ccc6bea"
            references users
            on delete cascade,
    "companiesId" integer not null
        constraint "FK_f150c30a741aee239f4beea864b"
            references companies
            on delete cascade,
    constraint "PK_b82664fbf8edc5fe9286c052e91"
        primary key ("usersId", "companiesId")
);

alter table users_companies
    owner to postgres;

create index "IDX_8c459ed79d9d38de0ce8ccc6be"
    on users_companies ("usersId");

create index "IDX_f150c30a741aee239f4beea864"
    on users_companies ("companiesId");

INSERT INTO public.users_companies ("usersId", "companiesId") VALUES (87, 10);
INSERT INTO public.users_companies ("usersId", "companiesId") VALUES (87, 2);
INSERT INTO public.users_companies ("usersId", "companiesId") VALUES (88, 10);
INSERT INTO public.users_companies ("usersId", "companiesId") VALUES (88, 2);
INSERT INTO public.users_companies ("usersId", "companiesId") VALUES (90, 10);
INSERT INTO public.users_companies ("usersId", "companiesId") VALUES (90, 2);
create table users_organizations
(
    "usersId"         integer not null
        constraint "FK_d11c3e3a2c84172a04398937d25"
            references users
            on delete cascade,
    "organizationsId" integer not null
        constraint "FK_83b955437be18ff6742c5bb6a12"
            references organizations
            on delete cascade,
    constraint "PK_37b6dab3781ada2aed6e0569073"
        primary key ("usersId", "organizationsId")
);

alter table users_organizations
    owner to postgres;

create index "IDX_d11c3e3a2c84172a04398937d2"
    on users_organizations ("usersId");

create index "IDX_83b955437be18ff6742c5bb6a1"
    on users_organizations ("organizationsId");

INSERT INTO public.users_organizations ("usersId", "organizationsId") VALUES (83, 10);
INSERT INTO public.users_organizations ("usersId", "organizationsId") VALUES (84, 10);
INSERT INTO public.users_organizations ("usersId", "organizationsId") VALUES (85, 10);
INSERT INTO public.users_organizations ("usersId", "organizationsId") VALUES (86, 10);
INSERT INTO public.users_organizations ("usersId", "organizationsId") VALUES (87, 11);
INSERT INTO public.users_organizations ("usersId", "organizationsId") VALUES (88, 11);
INSERT INTO public.users_organizations ("usersId", "organizationsId") VALUES (90, 11);