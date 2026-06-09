# BankDash

BankDash is a React and Material UI banking dashboard built with Vite. This version includes protected dashboard routes, authentication screens, theme switching, business module pages, profile/settings pages, and an Express + Supabase Postgres authentication API.



## Tech Stack

- React 18
- TypeScript
- Vite
- Material UI
- React Router
- ECharts
- Swiper
- Express
- Supabase Postgres
- pg
- JWT cookie authentication

## Requirements

- Node.js 18 or newer
- npm
- A Supabase project

## Getting Started

Install dependencies:

```bash
npm install
```

Create a local environment file:

```powershell
Copy-Item .env.example .env
```

Update `.env` with your Supabase database password and a strong `JWT_SECRET`.

Replace `[YOUR-PASSWORD]` in `DATABASE_URL` with the database password from Supabase.

Start the frontend and API server together:

```bash
npm run dev
```

If you need to run them separately, start the API server:

```bash
npm run server
```

Then start the Vite dev server in another terminal:

```bash
npm run dev:client
```

Open the app at:

```text
http://localhost:3000/bankdash
```

## Authentication

The API connects to Supabase Postgres and creates the `users` table automatically on startup. If `AUTH_SEED_PASSWORD` is set in `.env`, the server also creates a default user when the configured seed email does not already exist.

Default seed values are configured in `.env.example`:

```text
AUTH_SEED_EMAIL=info@dashbank.com
AUTH_SEED_PASSWORD=replace-with-a-strong-password
```

Use those credentials after replacing the password in your local `.env`.

## Environment Variables

| Variable                        | Description                                                                     |
| ------------------------------- | ------------------------------------------------------------------------------- |
| `API_PORT`                      | Express API port. Defaults to `5000`.                                           |
| `NODE_ENV`                      | Runtime mode. Use `development` locally.                                        |
| `SUPABASE_URL`                  | Supabase project URL.                                                           |
| `SUPABASE_PUBLISHABLE_KEY`      | Supabase publishable API key.                                                   |
| `VITE_SUPABASE_URL`             | Supabase URL exposed to the Vite frontend if needed.                            |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable key exposed to the Vite frontend if needed.                |
| `DATABASE_URL`                  | Supabase Postgres pooled connection string used by the API.                     |
| `DIRECT_DATABASE_URL`           | Supabase direct Postgres connection string for migrations or CLI usage.         |
| `DB_SSL`                        | Set to `true` for Supabase. Set to `false` only for local Postgres without SSL. |
| `DB_CONNECTION_LIMIT`           | Postgres pool connection limit.                                                 |
| `JWT_SECRET`                    | Secret used to sign auth cookies. Required.                                     |
| `CORS_ORIGIN`                   | Allowed frontend origin for API requests.                                       |
| `AUTH_SEED_NAME`                | Optional default user name.                                                     |
| `AUTH_SEED_EMAIL`               | Optional default user email.                                                    |
| `AUTH_SEED_PASSWORD`            | Optional default user password.                                                 |
| `AUTH_SEED_COMPANY_NAME`        | Optional default user company name.                                             |
| `VITE_API_PROXY_TARGET`         | API target used by the Vite dev proxy.                                          |
| `MISTRAL_API_KEY`               | Server-side API key for the AI Business Assistant. Do not expose it in React.   |
| `MISTRAL_MODEL`                 | Mistral chat model used by the assistant.                                       |

## Supabase CLI

The app does not require the Supabase CLI to run locally, but you can link the project for migrations or database workflows:

```bash
supabase login
supabase init
supabase link --project-ref fawzgobdmahfvxvjpfpo
```

Optional agent skills command:

```bash
npx skills add supabase/agent-skills
```

## Available Scripts

| Command              | Description                                       |
| -------------------- | ------------------------------------------------- |
| `npm run dev`        | Start the Express API and Vite frontend together. |
| `npm run dev:client` | Start only the Vite frontend on port `3000`.      |
| `npm run server`     | Start the Express API.                            |
| `npm run build`      | Type-check and build the app for production.      |
| `npm run lint`       | Run ESLint.                                       |
| `npm run format`     | Format files with Prettier.                       |
| `npm run preview`    | Preview the production build locally.             |
| `npm run deploy`     | Deploy the `dist` folder with `gh-pages`.         |

## Routes

The app is served under the `/bankdash` base path.

- `/bankdash/dashboard`
- `/bankdash/accounts`
- `/bankdash/payments`
- `/bankdash/collections`
- `/bankdash/accounting`
- `/bankdash/gst-tax`
- `/bankdash/invoicing`
- `/bankdash/lending`
- `/bankdash/trade-supply-chain`
- `/bankdash/payroll`
- `/bankdash/profile`
- `/bankdash/ai-assistant`
- `/bankdash/settings`
- `/bankdash/authentication/login`
- `/bankdash/authentication/sign-up`
- `/bankdash/authentication/forget-password`
- `/bankdash/authentication/reset-password`

## API Endpoints

- `GET /api/health`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`
- `POST /api/ai-assistant/chat`

## Production Build

Build the frontend:

```bash
npm run build
```

The Express server serves the built frontend from `dist` at `/bankdash`.

```bash
npm run server
```

## License

This project is based on the free BankDash dashboard template from ThemeWagon. Check the upstream project for original licensing details.
