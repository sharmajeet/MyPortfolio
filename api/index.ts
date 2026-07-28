import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createApp } from '../server/src/app.js';
import { connectDatabase } from '../server/src/config/database.js';

// Build the Express app once per warm instance.
let app: ReturnType<typeof createApp> | null = null;

function getApp() {
  if (!app) {
    app = createApp();
  }
  return app;
}

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    // Health check must not depend on the database so we can verify the
    // function is live even when MongoDB is unreachable.
    const isHealthCheck = req.url === '/api/health' || req.url === '/health';

    if (!isHealthCheck) {
      await connectDatabase();
    }

    const expressApp = getApp();
    return expressApp(req, res);
  } catch (error) {
    console.error('[v0] Error handling request:', error);
    if (!res.headersSent) {
      res.status(500).json({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
};
