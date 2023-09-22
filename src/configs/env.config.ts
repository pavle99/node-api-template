import * as dotenv from "dotenv";

import { envFileSchema } from "@/schemas/app";

dotenv.config();

export const envConfig = envFileSchema.parse(process.env);
