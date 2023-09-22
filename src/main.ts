import { createServer } from "express-zod-api";

import { isDevEnviroment } from "@/configs/app.config";
import { connectToDB } from "@/configs/db.config";
import { envConfig } from "@/configs/env.config";
import { zodConfig } from "@/configs/zod.config";
import { routing } from "@/routes";

if (isDevEnviroment && envConfig.GENERATE_CLIENT) {
  import("@/scripts/client-generator");
}

if (isDevEnviroment && envConfig.GENERATE_API_DOCS) {
  import("@/scripts/docs-generator");
}

// For docs about the express-zod-api integration: https://github.com/RobinTail/express-zod-api/tree/master
createServer(zodConfig, routing);

// const app = createServer(zodConfig, routing).app;
// const server = createServer(zodConfig, routing).httpServer;

connectToDB();
