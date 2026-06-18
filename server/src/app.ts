import path from "node:path";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { env } from "./config/env.js";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware.js";
import { requestLogger } from "./middlewares/request-logger.middleware.js";
import { apiRouter } from "./routes/index.js";

export function createApp() {
  const app = express();

  // Trust the proxy so req.ip reflects the real client behind a load balancer.
  app.set("trust proxy", env.TRUST_PROXY);

  // CSP is disabled because the same app serves an SPA that loads Google Fonts and an inline script.
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(cors({ origin: env.CORS_ORIGIN }));
  app.use(express.json({ limit: "10kb" }));
  app.use(requestLogger);

  app.use("/api", apiRouter);

  // Single-image deploy: serve the built frontend and let the SPA handle client-side routes.
  if (env.WEB_DIR) {
    const webDir = path.resolve(env.WEB_DIR);
    app.use(express.static(webDir));
    app.get("*", (req, res, next) => {
      if (req.path.startsWith("/api")) return next();
      res.sendFile(path.join(webDir, "index.html"));
    });
  }

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
