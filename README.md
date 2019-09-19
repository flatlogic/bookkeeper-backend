#### Run Project in Dev mode
`npm run dev`

#### Run Postgres in Docker container
`docker-compose up -d`

#### Run any command in Postgres container
`docker exec -it cp_for_web_postgres psql -U postgres -c "create database cp_master"
` 