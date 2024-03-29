import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './db/schema.ts',
  out: './drizzle',
  driver: 'better-sqlite',
  verbose: true,
  strict: true,
  dbCredentials: {
    url: 'sqlite.db',
  },
});
