import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { connectDatabase, disconnectDatabase } from "./config/database.js";
import { logger } from "./config/logger.js";
import { authService } from "./modules/auth/auth.routes.js";

async function bootstrap(): Promise<void> {
  await connectDatabase();

  if (env.ADMIN_EMAIL && env.ADMIN_PASSWORD) {
    await authService.seed(env.ADMIN_EMAIL, env.ADMIN_PASSWORD);
  } else {
    logger.warn("ADMIN_EMAIL / ADMIN_PASSWORD not set — admin endpoints will be unreachable until seeded.");
  }

  const server = createApp().listen(env.PORT, () => {
    logger.info(`Server running on http://localhost:${env.PORT} (${env.NODE_ENV})`);
  });

  const shutdown = async (signal: string): Promise<void> => {
    logger.info(`${signal} received, shutting down`);
    server.close();
    await disconnectDatabase();
    process.exit(0);
  };

  process.on("SIGINT", () => void shutdown("SIGINT"));
  process.on("SIGTERM", () => void shutdown("SIGTERM"));
}

bootstrap().catch((error) => {
  logger.error(`Failed to start server: ${error instanceof Error ? error.stack ?? error.message : String(error)}`);
  process.exit(1);
});
