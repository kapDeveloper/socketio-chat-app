// src/lib/dbConnect.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const MONGODB_DB = process.env.MONGODB_DB;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cachedClient = null;

async function dbConnect() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = await mongoose.connect(MONGODB_URI, {
    dbName: MONGODB_DB,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  cachedClient = client;
  return client;
}

export default dbConnect;