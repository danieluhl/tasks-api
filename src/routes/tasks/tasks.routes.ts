import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import {
  jsonContent,
  jsonContentOneOf,
  jsonContentRequired,
} from "stoker/openapi/helpers";
import { createErrorSchema, IdParamsSchema } from "stoker/openapi/schemas";

import {
  insertTasksSchema,
  patchTasksSchema,
  selectTasksSchema,
} from "@/db/schema";
import { notFoundSchema } from "@/lib/constants";

const tags = ["tasks"];

const list = createRoute({
  path: "/tasks",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectTasksSchema),
      "The List of Tasks",
    ),
  },
});

const getOne = createRoute({
  path: "/tasks/{id}",
  request: {
    params: IdParamsSchema,
  },
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectTasksSchema, "Task with the Id"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Task not found"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertTasksSchema),
      "The validation error(s)",
    ),
  },
});

const create = createRoute({
  path: "/tasks",
  method: "post",
  request: {
    body: jsonContentRequired(insertTasksSchema, "The task to create"),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectTasksSchema, "The Created Task"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertTasksSchema),
      "The validation error(s)",
    ),
  },
});

const patch = createRoute({
  path: "/tasks/{id}",
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(patchTasksSchema, "The task updates"),
  },
  method: "patch",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectTasksSchema, "The updated Task"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Task not found"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContentOneOf(
      [createErrorSchema(patchTasksSchema), createErrorSchema(IdParamsSchema)],
      "The validation error(s)",
    ),
  },
});

const remove = createRoute({
  path: "/tasks/{id}",
  request: {
    params: IdParamsSchema,
  },
  method: "delete",
  tags,
  responses: {
    [HttpStatusCodes.NO_CONTENT]: { description: "The deleted Task" },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Task not found"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "The validation error(s)",
    ),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type GetOneRoute = typeof getOne;
export type PatchRoute = typeof patch;
export type RemoveRoute = typeof remove;

export { create, getOne, list, patch, remove };
