import { taggedEndpointsFactory } from "@/factories";
import { authMiddleware } from "@/middlewares/auth.middleware";

export const authenticatedEndpointsFactory = taggedEndpointsFactory.addMiddleware(authMiddleware);
