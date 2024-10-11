import { drizzle } from "drizzle-orm/connect";

import { env } from "@/env";

import * as schema from "./schema";

const db = await drizzle("node-postgres", {
  connection: {
    connectionString: env.DATABASE_URL,
  },
  schema,
});

export { db };
