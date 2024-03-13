// global client
// create db func to handle connections to database

import { Client } from "pg";

const client = new Client({
  connectionString:
    "postgresql://postgres:tusay101@localhost:5432/postgres?schema=public",
});

const db = function queryClient(db: Client): Client {};
