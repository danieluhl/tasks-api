import { configureOpenApi } from "@/lib/configure-openapi";
import { createApp } from "@/lib/create-app";
import { index } from "@/routes/index.route";
import { tasksRouter } from "@/routes/tasks/tasks.index";

const app = createApp();

configureOpenApi(app);

const routes = [index, tasksRouter] as const;

routes.forEach((route) => app.route("/", route));

export type AppType = (typeof routes)[number];

export { app };
