import 'server-only';
import mongoose from 'mongoose';

// Prefer 127.0.0.1 for local Compass to avoid IPv6/localhost issues
const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/ladakh';

if (!MONGODB_URI) {
  throw new Error('Missing MONGODB_URI. Add it to your .env.local (MongoDB Atlas connection string).');
}

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Augment globalThis for type-safe caching in Next.js dev
declare global {
  // eslint-disable-next-line no-var
  var mongooseConn: MongooseCache | undefined;
}

// Use globalThis to avoid TS errors with `global`
const globalForMongoose = globalThis as unknown as { mongooseConn?: MongooseCache };

// Reuse cached connection across HMR in dev
const cached: MongooseCache =
  globalForMongoose.mongooseConn ?? (globalForMongoose.mongooseConn = { conn: null, promise: null });

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = { bufferCommands: false } as const;
    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn!;
}