import { defaultResultHandler, EndpointsFactory } from "express-zod-api";

import { zodConfig as config } from "@/configs/zod.config";

export const taggedEndpointsFactory = new EndpointsFactory({
  resultHandler: defaultResultHandler,
  config,
});
