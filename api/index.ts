import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createApp } from '../server/src/app.js';
import { env } from '../server/src/config/env.js';
import { connectDatabase, disconnectDatabase } from '../server/src/config/database.js';

// Single app instance
let app: any = null;
let dbConnected = false;

async function initializeApp() {
  if (app) return app;

  if (!dbConnected) {
    await connectDatabase();
    dbConnected = true;
  }

  app = createApp();
  return app;
}

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    const expressApp = await initializeApp();
    return expressApp(req, res);
  } catch (error) {
    console.error('Error initializing app:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
