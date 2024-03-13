// global client
// create db func to handle connections to database

import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

const client = new Client({
  connectionString:
    "postgresql://postgres:tusay101@localhost:5432/postgres?schema=public",
});

await client.connect();

export const db = drizzle(client);
