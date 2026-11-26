# Bookkeeper Backend

The Express and PostgreSQL API for Flatlogic Bookkeeper manages companies, customers, accounts and the general ledger.

[Bookkeeper frontend](https://github.com/flatlogic/bookkeeper) · [API examples](BK_WEB.postman_collection.json) · [Changelog](changelog.md)

## Run locally

1. Install Node.js 20.19+ on the 20.x line, 22.13+ on the 22.x line, or 24.11 or later, and npm 8.11 or newer. Version 2.0 drops support for Node 16 and 18. Upgrade your Node runtime before installing dependencies. If you build a container, use a supported Node version in both the build and runtime stages.
2. Create a dedicated PostgreSQL database. For local development the defaults are `localhost:5432`, user `postgres` and database `bookkeeper_seed`. Override them with `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD` and `PGDATABASE` as needed. In production set `NODE_ENV=production` and `DATABASE_URL`.
3. Copy [.env.example](.env.example) to `.env`. Set `PORT` and give `SECRET` a private, random value for signing sessions. Keep the same secret when upgrading an existing installation to preserve its sessions.
4. Install dependencies and start the API.

```sh
npm ci
npm run dev
```

For a compiled run, use `npm run build` followed by `npm start`. Run `npm test` to build and check sessions, public registration, ledger validation, subaccount access and the invitation and password-reset emails. The test suite runs locally without PostgreSQL or an SMTP server.

## Database upgrades

The API runs pending TypeORM migrations before accepting requests. The first migration creates 13 empty application tables on a fresh database. To work with an existing installation, restore its database and use an existing administrator account. A fresh database requires an administrator provisioned by its operator.

Before upgrading an existing database, take a backup. On a v1.0.1 database, the first migration checks that the expected tables and columns exist and records the baseline in `_migrations`. Accounting records, existing migration history and unrelated tables are preserved. If an expected table or column is missing, startup stops and identifies it. Review any custom column types and constraints separately.

To apply pending migrations before starting the API, build the project and run `npm run migrate:run`. Repeated runs skip migrations already recorded. To revert the most recent migration, run `npm run migrate:revert`. Reverting the 1.1.0 baseline removes its history entry and keeps the tables and data. Local development and production use the same migration code. Version 2.0 keeps the 1.1.0 baseline and its migration history.

## Accounts and sessions

Administrators create users through `POST /api/admin/users`. Public `POST /api/register` returns HTTP 403 and issues no token. New accounts use the existing password setup flow. For privileged accounts created before 1.1.0 with the shared initial password, use the password reset flow to assign individual passwords.

Sign in with `POST /api/login`. A successful response contains the user profile and a `token` value. Send that complete value, including its `JWT ` prefix, in the `Authorization` header. Newly issued tokens contain the account ID and the issue and expiration timestamps. Permissions are read from the database. Sessions issued by v1.0.1 with the same secret remain valid until their original expiration. Signing in again issues a token in the new format.

## Email delivery

Set `SMTP_HOST`, `SMTP_FROM` and, if your relay requires authentication, `SMTP_USER` and `SMTP_PASSWORD`. The default port is 587. Set `SMTP_USE_TLS=true` to require STARTTLS or `SMTP_PORT=465` for implicit TLS. For a relay signed by a private certificate authority, set `NODE_EXTRA_CA_CERTS` to its CA certificate file. Configure `UI_BASE_URL` and `UI_SET_PASSWORD_URL` so invitation and reset emails link to your frontend.

## Accounts and subaccounts

The accounts, subaccounts and account-budget endpoints use the signed-in user's active, selected company. The user must still be assigned to that company. A record outside the selected company returns HTTP 404. Requests without an active company assignment return HTTP 403.

To save a subaccount, send `code` and `description` to `POST /api/subaccounts` (create) or `PUT /api/subaccounts/:id` (edit). The optional `parent` is a main account ID in the same company. On edit, omit `parent` to keep the current link or send `null` to clear it. The server sets the company and account type.

## Save a general ledger

`POST /api/general-ledger` saves the ledger for the signed-in user's selected company. A new ledger needs twelve period months. The form sends `period1Month` through `period12Month` as month numbers (1 through 12), and `period1Status` through `period12Status` as 1 for open or 0 for closed. New periods default to open. Fiscal years are four digits. When editing, you can send just the fields that changed. Invalid values return HTTP 400 with `modelErrors` before the record is saved.

## Import a general ledger

Use an active administrator account with an active, selected company assigned to that user. Send the same `Authorization` header as for a regular login and pass the selected company's ID as the `companyId` query parameter.

| Method | Path | Result |
| --- | --- | --- |
| GET | `/migration/general-ledger` | List the company's ledgers |
| GET | `/migration/general-ledger/:fiscalYear` | Read one fiscal year |
| POST or PUT | `/migration/general-ledger` | Import a JSON array of rows |

Each row identifies its ledger by `CurrentFiscalYear`. For a new year, supply `Period1Description` through `Period12Description`. English month names, abbreviations and numbers 1–12 are accepted. Legacy status flags use an empty string or `O` for open and `C` for closed.

For example, this request closes the first period of an **existing** ledger. Set `API_URL` to your local server, `COMPANY_ID` to the selected company and `BOOKKEEPER_AUTH` to the token returned at login.

```sh
curl --request PUT "$API_URL/migration/general-ledger?companyId=$COMPANY_ID" \
  --header "Authorization: $BOOKKEEPER_AUTH" \
  --header 'Content-Type: application/json' \
  --data '[{"CurrentFiscalYear":"2026","Period1Status":"C"}]'
```

Check both `success` and `errors` in the response. Rows are processed independently. A rejected row leaves its stored ledger unchanged, while valid rows in the same request can still be saved. Retained earnings accounts and subaccounts are looked up within the selected company.
