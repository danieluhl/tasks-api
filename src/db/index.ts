import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

import { env } from "@/env";

import * as schema from "./schema";

const client = new Client({ connectionString: env.DATABASE_URL });
const db = drizzle(client, { schema });

export { db };
