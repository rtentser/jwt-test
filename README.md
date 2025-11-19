# Express REST File Service

Contents: docker-compose, Sequelize models & migrations, JWT auth, file upload.

Quick start:
1. Copy `.env` or set env vars: DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
2. Build & run:
   docker-compose up --build
3. Enter api container and run migrations:
   docker exec -it express_api sh
   npm run migrate
4. Start server (container already runs it on start). Default port 3000.

## Known issues
- on logout, refresh tokens become expired, while access tokens remain valid until their expiration time