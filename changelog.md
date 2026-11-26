v2.0.0 - 26/11/2026

- Raised the supported Node.js versions to 20.19+ (20.x), 22.13+ (22.x) and 24.11 or later.
- Scoped account and subaccount edits, parent links and accounting budgets to the user's selected, assigned company. Subaccounts keep their owner and account type on edit.
- Updated Express, bcrypt, Passport and JWT dependencies. Replaced email-templates with direct Pug rendering and updated Nodemailer. SMTP now verifies the relay certificate.
- Updated TypeORM to 1.1.3 and adapted relation lookups. The existing migration history and database schema are retained.
- Added regression tests for subaccount edits, invitations and password-reset emails.

v1.1.0 - 26/11/2026

- Updated TypeORM from 0.2.25 to 0.3.31. Startup and the migration CLI now apply versioned schema changes to PostgreSQL. The first migration creates empty tables or adopts the existing accounting schema and preserves its data.
- Reduced new login tokens to the user ID and timestamps. Password fields are omitted from the login response. Existing sessions keep their original expiry.
- Restricted account creation to administrators. Public registration returns HTTP 403 without issuing a token. New privileged accounts use the password setup flow.
- Updated the database and session documentation and added login and registration regression tests.

v1.0.1 - 26/11/2026

- Updated class-validator from 0.10.0 to 0.15.1.
- Validated general ledger fiscal years, months, period statuses and the prior-year closure flag. Partial edits preserve omitted fields. Legacy imports report invalid rows individually.
- Fixed general ledger imports to use the existing administrator login and restrict reads, writes and account lookups to the administrator's assigned, selected company.
- Added ledger regression tests and documented the form and import formats.

v1.0.0 Initial release
