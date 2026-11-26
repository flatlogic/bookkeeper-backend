v1.0.1 - 26/11/2026

- Updated class-validator from 0.10.0 to 0.15.1.
- Validated general ledger fiscal years, months, period statuses and the prior-year closure flag. Partial edits preserve omitted fields. Legacy imports report invalid rows individually.
- Fixed general ledger imports to use the existing administrator login and restrict reads, writes and account lookups to the administrator's assigned, selected company.
- Added ledger regression tests and documented the form and import formats.

v1.0.0 Initial release
