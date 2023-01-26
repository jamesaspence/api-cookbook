# Cookbook API

## Getting Started

1) Create an `.env` file. You can copy `.env.example` to `.env`.
2) Fill in an `APP_SECRET`. It must be at least 16 characters long.
3) Spin up the database. You can run the database via `docker compose up -d`.
4) Run DB migrations via `yarn migrate:dev`.
5) Run the app via `yarn start`.