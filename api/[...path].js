import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
let server;

export default async function handler(req, res) {
  try {
    if (!server) {
      server = require('../server/index.cjs');
    }

    await server.ready;
    return server.app(req, res);
  } catch (error) {
    console.error('API initialization failed.', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        message:
          'API server is not configured. Check DATABASE_URL and JWT_SECRET in Vercel Environment Variables.',
      }),
    );
  }
}
