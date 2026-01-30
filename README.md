# create-roux

CLI to scaffold a Roux boilerplate project (Express + Sequelize + Postgres).

## Usage

```bash
npx create-roux my-app
# or
npm create roux my-app
```

Then:

```bash
cd my-app
npm install
cp .env.example .env
npm run compile
npm run start
```

## What you get

- Express API base
- Sequelize + Postgres setup
- Generators: `npm run generate:*`

## Notes

Template is bundled in this package for fast install and versioned snapshots.
