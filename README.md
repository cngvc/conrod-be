# NestJS Project with Docker Compose

This project is a basic application built with NestJS, utilizing Docker Compose to set up and manage the database.

## Requirements

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Installation

1. **Clone the project to your local machine**:

```bash
git clone https://github.com/cngvc/nestjs-shop-be.git
```

2. **Create database** (Postgres DB)

```bash
docker-compose up -d
```

3. **Update .env**

```bash
DATASOURCE_USERNAME=postgres
DATASOURCE_PASSWORD=postgres
DATASOURCE_HOST=localhost
DATASOURCE_PORT=5432
DATASOURCE_DATABASE=postgres
DATASOURCE_URL=postgres://${DATASOURCE_PASSWORD}@${DATASOURCE_HOST}:${DATASOURCE_PORT}/${DATASOURCE_DATABASE}

JWT_SECRET=10c039abab67e1fb6a59416048a5fd7956c689c14440d9696cd7b956298d3d68d7d54cfec5d861af768b6341d3b3bdad4f40424df2a281f5f12cd1dc44f94af3
JWT_TTL=7d
```

4. **Install packages**

```bash
yarn
```

5. **Run migrations**

```bash
yarn migration:run
```

This migration, 1730201080123-insert-admin, will create a new admin user. Log in with `admin@gmail.com/Asdfgh1@3` to get an admin access token, then run the `/seeding` API to create seed data.

6. **Start project in dev env**

```bash
yarn start:dev
```

7. **API documents (Swagger)**

```
localhost:3000/api
```

Happy coding!!!
