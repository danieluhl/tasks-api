import { OpenAPIHono } from "@hono/zod-openapi";

import {
  notFound,
  onError,
  pinoLogger,
  serveEmojiFavicon,
} from "@/middlewares";
import defaultHook from "@/openapi/default-hook";

import type { AppBindings, AppOpenApi } from "./types";

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook,
  });
}

export function createApp() {
  const app = createRouter();

  app.use(serveEmojiFavicon("🔥"));
  app.use(pinoLogger());
  app.notFound(notFound);
  app.onError(onError);
  return app;
}

export function createTestApp(router: AppOpenApi) {
  const testApp = createApp();
  testApp.route("/", router);
  return testApp;
}
