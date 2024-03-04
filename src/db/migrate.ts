// connection to postgres database
//
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import "dotenv/config";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// connect drizzle to postgres database

const db = drizzle(pool);

async function main() {
  console.log("migration start...");
  await migrate(db, { migrationsFolder: "drizzle" });
  console.log("migration end");
  process.exit(0);
}

main().catch((err) => {
  console.log(err);
  process.exit(0);
});
