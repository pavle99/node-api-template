/* eslint-disable no-console */
import fs from "fs";
import { Documentation } from "express-zod-api";

import { envConfig } from "@/configs/env.config";
import { zodConfig as config } from "@/configs/zod.config";
import { routing } from "@/routes";

console.log("✍️  Generating docs...");
// Check this for docs: https://github.com/RobinTail/express-zod-api/tree/master#creating-a-documentation
fs.writeFileSync(
  "./src/docs/api.yaml",
  new Documentation({
    routing, // the same routing and config that you use to start the server
    config,
    version: envConfig.API_VERSION,
    title: envConfig.API_TITLE,
    serverUrl: envConfig.API_SERVER_URL,
    composition: "inline", // optional, or "components" for keeping schemas in a separate dedicated section using refs
  }).getSpecAsYaml(),
  "utf-8",
);
console.log("✅ OpenAPI API Docs generated at ./docs/api.yaml");
