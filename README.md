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