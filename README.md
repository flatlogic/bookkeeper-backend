#### Run Project in Dev mode
`npm run dev`

#### Run Postgres in Docker container
`docker-compose up -d`

#### Run any command in Postgres container
`docker exec -it cp_for_web_postgres psql -U postgres -c "create database cp_master"
` 

#### Go to container
`
docker exec -it cp_for_web_postgres /bin/bash
`

#### Emails local testing
We use https://ethereal.email service to test sending emails on the local machine.
To have it working create an account in the https://ethereal.email and setup env variables in .env file
When new email is sent just go to https://ethereal.email/messages and see the email


#### Heroku debug
`
heroku logs -a cp4web-be --tail
`

#### How to set up database 

MAC OS
1) run

`brew install postgres` 
OR
`brew install postgresql`

if psql command gives you error, please try to reinstall postgres/postgresql and run brew services restart postgres/postgresql
2) run psql --u postgres, if you see error please create new user with command createuser postgres -s (s flag stands for super)
3) now you are logged in under postgres super user, run create database cp_master;
4) run this command to connect to the new db -> \c cp_master
5) copy path to the db file from text editor/finder
6) open terminal with opened cp_master db, run \i path/to/db
start backend
start frontend
login with superUser::user
if you see error and not able to login please run this command in terminal with opened cp_master db -> INSERT INTO public.users (id, username, password, is_deleted, first_name, last_name, middle_name, suffix, email, phone, roles, last_login, status, password_token, last_company_selected) VALUES (14, 'superUser', '$2b$10$clHYYnmFeDY1f6dFbUKWUuJxOQPECQIw1ZBjHcfenznPAdeWkeOWC', false, 'Super', 'User', '', null, 'superusertest@gmail.com', '+9999999999', '{SUPER_USER}', '2019-11-10 08:57:02.508000', 1, null, null);

WINDOWS
MAC OS
1) install postgres
2) run psql -U postgres
3) now you are logged in under postgres super user, run create database cp_master;
4) run this command to connect to the new db -> \c cp_master
5) copy path to the db file from text editor/finder
6) open terminal with opened cp_master db, run \i 'path\\to\\db'
start backend
start frontend
login with superUser::user
if you see error and not able to login please run this command in terminal with opened cp_master db -> INSERT INTO public.users (id, username, password, is_deleted, first_name, last_name, middle_name, suffix, email, phone, roles, last_login, status, password_token, last_company_selected) VALUES (14, 'superUser', '$2b$10$clHYYnmFeDY1f6dFbUKWUuJxOQPECQIw1ZBjHcfenznPAdeWkeOWC', false, 'Super', 'User', '', null, 'superusertest@gmail.com', '+9999999999', '{SUPER_USER}', '2019-11-10 08:57:02.508000', 1, null, null);