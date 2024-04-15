// global client
// create db func to handle connections to database

import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "./schema";
const client = new Client({
  connectionString:
    "postgresql://postgres:tusay101@localhost:5432/postgres?schema=public",
});

client.connect();

export const db = drizzle(client, { schema: schema });
