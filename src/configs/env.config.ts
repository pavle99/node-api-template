import { envFileSchema } from "@/schemas/app";
import * as dotenv from "dotenv";
dotenv.config();

export const envConfig = envFileSchema.parse(process.env);
