import * as HttpStatusPhrase from "stoker/http-status-phrases";
import { createMessageObjectSchema } from "stoker/openapi/schemas";

export const notFoundSchema = createMessageObjectSchema(
  HttpStatusPhrase.NOT_FOUND,
);
