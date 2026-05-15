# Deploy Loomic on Dokploy with Docker Compose

This setup runs three containers:

- `web`: static Next.js export served by nginx on port `80`
- `api`: Fastify API and WebSocket server on internal port `3001`
- `worker`: background image/video generation worker

The public Dokploy route should point to the `web` service. The included nginx config proxies `/api/*` and `/api/ws` to the internal `api` service, so the frontend and API can share one domain.

## 1. Prepare Supabase

Create a Supabase project and apply the migrations:

```bash
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

Use the direct Postgres connection string as `SUPABASE_DB_URL`; the worker uses it for PGMQ.

## 2. Create the Dokploy app

1. Create a new Dokploy Compose app from your Git repository.
2. Keep `docker-compose.yml` as the Compose file.
3. Add a domain to the `web` service, pointing to container port `80`.
4. Enable HTTPS in Dokploy.

## 3. Set environment variables

Use `.env.dokploy.example` as the template.

For production, set both of these to your public HTTPS domain:

```env
NEXT_PUBLIC_SERVER_BASE_URL=https://loomic.example.com
LOOMIC_WEB_ORIGIN=https://loomic.example.com
```

`NEXT_PUBLIC_SERVER_BASE_URL` is embedded when the web image is built, so rebuild the app after changing it.

At minimum, configure:

```env
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_DB_URL=
SUPABASE_PROJECT_ID=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
LOOMIC_AGENT_MODEL=google:gemini-2.5-flash
GOOGLE_API_KEY=
```

You can use `OPENAI_API_KEY` instead of `GOOGLE_API_KEY` if `LOOMIC_AGENT_MODEL` is an OpenAI model.

## 4. Deploy

Deploy from Dokploy. After the containers are healthy, verify:

```text
https://loomic.example.com/api/health
```

Expected response:

```json
{"ok":true,"service":"loomic-server","version":"0.0.0"}
```

## Local smoke test

```bash
cp .env.dokploy.example .env
docker compose up --build
```

Then open `http://localhost:3000`.
