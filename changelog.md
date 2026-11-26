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
