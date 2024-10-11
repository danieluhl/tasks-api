#!/usr/bin/env bash

source .env

docker stop drizzle-postgres

docker rm drizzle-postgres

docker run --name drizzle-postgres \
  -e POSTGRES_PASSWORD=$DATABASE_PASSWORD \
  -d -p 5432:5432 postgres
