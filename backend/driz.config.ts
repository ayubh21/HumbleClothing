import type { Config } from "drizzle-kit";
export default {
  schema: "./src/api/db/schema.ts",
  out: "./drizzle",
} satisfies Config;
