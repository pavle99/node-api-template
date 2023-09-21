import { taggedEndpointsFactory } from "@/factories/tagged-endpoints.factory";
import {
  isAdminMiddleware,
  isModeratorMiddleware,
  verifyTokenMiddleware,
} from "@/middlewares/auth.middleware";
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
import { createHttpError } from "express-zod-api";

export const getUsersController = taggedEndpointsFactory
  .addMiddleware(verifyTokenMiddleware)
  .build({
    method: "get",
    tag: "users",
    input: getUsersInputSchema,
    output: getUsersOutputSchema,
    handler: async ({ logger }) => {
      logger.debug("Querying all users...");

      return { demoData: "Querying all users succeed!" };
    },
  });

export const getUsersModController = taggedEndpointsFactory
  .addMiddleware(verifyTokenMiddleware)
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

export const getUsersAdminController = taggedEndpointsFactory
  .addMiddleware(verifyTokenMiddleware)
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
    handler: async ({ input: { id }, options: { method }, logger }) => {
      logger.debug(`Requested id: ${id}, method ${method}`);

      if (id > 100) throw createHttpError(404, "User not found");

      // Example calling async function but with the safety it never crashes!
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
