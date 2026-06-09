import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
let server;

export default async function handler(req, res) {
  try {
    if (!server) {
      server = require('../../server/index.cjs');
    }

    await server.ready;
    req.url = '/api/auth/me';
    return server.app(req, res);
  } catch (error) {
    console.error('Current user API failed.', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Current user API is not configured correctly.' }));
  }
}
