import { drizzle } from "drizzle-orm/connect";
import { newDb } from "pg-mem";

import { env } from "@/env";

import * as schema from "./schema";

async function createDb() {
  if (env.NODE_ENV === "testing") {
    const inMemDb = newDb().adapters.createPg().Client;
    const db = drizzle(inMemDb);
    // await migrate(db, { migrationsFolder: "../migrations" }).catch((err) => {

    // });
    return db;
  } else {
    return await drizzle("node-postgres", {
      connection: {
        connectionString: env.DATABASE_URL,
      },
      schema,
    });
  }
}

const db = await createDb();

export { db };
