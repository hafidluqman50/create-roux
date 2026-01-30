# Roux

Express + Sequelize + Postgres boilerplate (TypeScript).

## Setup

- Clone project
- Install dependencies: `npm install`
- Copy env: `cp .env.example .env` and edit values
- Compile TypeScript: `npm run compile`
- Run server: `npm run start`

Development:
- `npm run compile` then `npm run start:dev`

## Generators

Use the built-in generators to scaffold modules:

- Model: `npm run generate:model -- User`
- Repository: `npm run generate:repository -- User`
- Service: `npm run generate:service -- User`
- Controller: `npm run generate:controller -- User`
- Route: `npm run generate:route -- user`

Notes:
- The route generator will auto-register in `routes/app.ts` using markers.
- File naming is based on PascalCase for classes and kebab-case for routes.

## Structure

- `app/Models` Sequelize models
- `app/Http/Repositories` data access
- `app/Http/Services` business logic
- `app/Http/Controllers` HTTP handlers
- `routes` Express routes
- `config` app config (database, etc)
