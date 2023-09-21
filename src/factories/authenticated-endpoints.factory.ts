import { taggedEndpointsFactory } from "@/factories/tagged-endpoints.factory";
import { verifyTokenMiddleware } from "@/middlewares/auth.middleware";

export const authenticatedEndpointsFactory =
  taggedEndpointsFactory.addMiddleware(verifyTokenMiddleware);
