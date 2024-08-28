import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./migrations",
  dialect: "sqlite", // 'postgresql' | 'mysql' | 'sqlite'
  verbose: true,
  driver: "d1",
  dbCredentials: {
    wranglerConfigPath: "./wrangler.toml",
    dbName: "page-starter-preview",
  },
});
