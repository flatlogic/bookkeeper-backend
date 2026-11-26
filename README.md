# Bookkeeper Backend

The Express and PostgreSQL API for Flatlogic Bookkeeper manages companies, customers, accounts and the general ledger.

[Bookkeeper frontend](https://github.com/flatlogic/bookkeeper) · [API examples](BK_WEB.postman_collection.json) · [Changelog](changelog.md)

## Run locally

1. Install Node.js and npm. The package declares Node.js 16.15.1 or later and npm 8.11 or later. Release 1.0.1 was tested on Node.js 22.23.0 with PostgreSQL 16.8.
2. Create a dedicated development database. The development connection defaults to `bookkeeper_seed` on `localhost:5432`. Set the local database role and connection details in [ormconfig.js](ormconfig.js). The application synchronizes its schema on startup.
3. Copy [.env.example](.env.example) to `.env`. Set `NODE_ENV=development`, a free `PORT` and a private `SECRET` for signing sessions.
4. Install dependencies and run the API.

```sh
npm ci
npm run dev
```

For a compiled run, use `npm run build` followed by `npm start`. Run `npm test` to build and check general ledger validation without starting a database. For email development, see the [mailer](src/services/mailer.ts) and [Ethereal test inboxes](https://ethereal.email/).

## Save a general ledger

Sign in with `POST /api/login`. Use the complete `token` value returned by the API (including the `JWT ` prefix) as the `Authorization` header.

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
