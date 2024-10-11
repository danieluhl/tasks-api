import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { createMessageObjectSchema } from "stoker/openapi/schemas";

import { createRouter } from "@/lib/create-app";

const index = createRouter().openapi(
  createRoute({
    method: "get",
    tags: ["index"],
    path: "/",
    responses: {
      [HttpStatusCodes.OK]: jsonContent(
        createMessageObjectSchema("Tasks API"),
        "Tasks API Index",
      ),
    },
  }),
  (c) => {
    return c.json({ message: "Tasks API" }, HttpStatusCodes.OK);
  },
);

export { index };
