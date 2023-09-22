/* eslint-disable no-console */
import fs from "fs";
import { Integration } from "express-zod-api";

import { routing } from "@/routes";

console.log("✍️  Generating client...");

// Check https://github.com/RobinTail/express-zod-api/tree/master#generating-a-frontend-client
fs.writeFileSync("./src/client/client.ts", new Integration({ routing }).print(), "utf-8");
console.log("✅ Client generated at ./client/client.ts");
