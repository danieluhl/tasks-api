import { logger } from "hono-pino";
import pino from "pino";
import pretty from "pino-pretty";

import { env } from "@/env";

// pino is a standard structured logger
//  that adds a ton of useful information
//  to our logs
// pino-pretty pretty prints the json in the logs
export function pinoLogger() {
  return logger({
    pino: pino({
      level: env.LOG_LEVEL || "info",
    }, env.NODE_ENV === "production" ? undefined : pretty()),
    http: {
      reqId: () => crypto.randomUUID(),
    },
  });
}
