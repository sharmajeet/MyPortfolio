import mongoose from "mongoose";
import { env } from "./env.js";
import { logger } from "./logger.js";

// Cache the connection promise across serverless invocations so we reuse a
// single connection instead of opening a new one on every cold start.
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalForMongoose = globalThis as unknown as {
  _mongooseCache?: MongooseCache;
};

const cache: MongooseCache =
  globalForMongoose._mongooseCache ?? { conn: null, promise: null };

globalForMongoose._mongooseCache = cache;

export async function connectDatabase(): Promise<typeof mongoose> {
  if (cache.conn) {
    return cache.conn;
  }

  mongoose.set("strictQuery", true);
  // Fail fast instead of buffering commands forever when the DB is unreachable.
  mongoose.set("bufferCommands", false);

  if (!cache.promise) {
    cache.promise = mongoose
      .connect(env.MONGODB_URI, {
        // Short timeouts so a misconfigured network/URI errors quickly rather
        // than hanging until the serverless function times out.
        serverSelectionTimeoutMS: 8000,
        connectTimeoutMS: 8000,
        socketTimeoutMS: 20000,
        maxPoolSize: 5,
      })
      .then((m) => {
        logger.info("MongoDB connected");
        return m;
      })
      .catch((error) => {
        // Reset the promise so the next invocation can retry.
        cache.promise = null;
        logger.error("MongoDB connection failed", error);
        throw error;
      });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}

export async function disconnectDatabase(): Promise<void> {
  if (cache.conn) {
    await mongoose.disconnect();
    cache.conn = null;
    cache.promise = null;
    logger.info("MongoDB disconnected");
  }
}
