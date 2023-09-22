import { createHttpError } from "express-zod-api";

import { authenticatedEndpointsFactory } from "@/factories/authenticated-endpoints.factory";
import { taggedEndpointsFactory } from "@/factories/tagged-endpoints.factory";
import { isAdminMiddleware, isModeratorMiddleware } from "@/middlewares/auth.middleware";
import { methodProviderMiddleware } from "@/middlewares/method-provider.middleware";
import {
  getUserInputSchema,
  getUserOutputSchema,
  getUsersInputSchema,
  getUsersOutputSchema,
  updateUserInputSchema,
  updateUserOutputSchema,
} from "@/schemas/users";
import { exampleWithRandomThrow } from "@/services/example.service";
import { safeAsync } from "@/utils/catcher";

export const getUsersController = authenticatedEndpointsFactory.build({
  method: "get",
  tag: "users",
  input: getUsersInputSchema,
  output: getUsersOutputSchema,
  handler: async ({ logger }) => {
    logger.debug("Querying all users...");

    return { demoData: "Querying all users succeed!" };
  },
});

export const getUsersModController = authenticatedEndpointsFactory
  .addMiddleware(isModeratorMiddleware)
  .build({
    method: "get",
    tag: "users",
    input: getUsersInputSchema,
    output: getUsersOutputSchema,
    handler: async ({ logger }) => {
      logger.debug("Querying all users with MOD privileges...");

      return { demoData: "Querying all users with MOD privileges succeed!" };
    },
  });

export const getUsersAdminController = authenticatedEndpointsFactory
  .addMiddleware(isAdminMiddleware)
  .build({
    method: "get",
    tag: "users",
    input: getUsersInputSchema,
    output: getUsersOutputSchema,
    handler: async ({ logger }) => {
      logger.debug("Querying all users with ADMIN priviliges...");

      return { demoData: "Querying all users with ADMIN priviliges succeed!" };
    },
  });

export const getUserEndpoint = taggedEndpointsFactory
  .addMiddleware(methodProviderMiddleware)
  .build({
    method: "get",
    tag: "users",
    shortDescription: "Retrieves an user by its ID.",
    description: "Example user retrieval endpoint.",
    input: getUserInputSchema,
    output: getUserOutputSchema,
    handler: async ({ input: { id, queryParam }, options: { method }, logger }) => {
      logger.debug(`Requested id: ${id}, method ${method}, queryParam: ${queryParam}`);

      if (id > 100) throw createHttpError(404, "User not found");

      const exampleFnResult = await safeAsync(async () => await exampleWithRandomThrow());

      if (!exampleFnResult.ok) {
        return { demoData: `Querying User ${id} failed safely: ${exampleFnResult.data}` };
      }

      return { demoData: `Querying User ${id} succeed!` };
    },
  });

export const updateUserEndpoint = taggedEndpointsFactory
  .addMiddleware(methodProviderMiddleware)
  .build({
    method: "post",
    tag: "users",
    shortDescription: "Updates an user by its ID.",
    description: "Example user retrieval endpoint.",
    input: updateUserInputSchema,
    output: updateUserOutputSchema,
    handler: async ({ input: { id, name }, options: { method }, logger }) => {
      logger.debug(`Requested id: ${id}, method ${method}, Name to set: ${name}`);

      if (id > 100) throw createHttpError(404, "User not found");

      throw createHttpError(500, "Not implemented yet!");
    },
  });
