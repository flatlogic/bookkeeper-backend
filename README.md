#### Run Project in Dev mode
`npm run dev`

#### Emails local testing
We use https://ethereal.email service to test sending emails on the local machine.
To have it working create an account in the https://ethereal.email and setup env variables in .env file
When new email is sent just go to https://ethereal.email/messages and see the email


#### How to set up database 

# MAC OS

1) run

`brew install postgres` 

OR

`brew install postgresql`

if psql command gives you error, please try to reinstall postgres/postgresql and run 

`brew services restart postgres/postgresql`

2) run 

`psql --u postgres`

if you see error please create new user with command -> `createuser postgres -s` (s flag stands for super)

3) now you are logged in under postgres super user, run `create database bookkeeper_seed`;
4) run this command `npm run migrate:run`

# WINDOWS

1) install postgres
2) run `psql -U postgres`
3) now you are logged in under postgres super user, run `create database bookkeeper_seed`;
4) run this command `npm run migrate:run`