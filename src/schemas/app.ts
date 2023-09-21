import { z } from "zod";

export const logLevelSchema = z.enum(["silent", "warn", "debug"]).default("debug");

export const envFileSchema = z.object({
  PORT: z.coerce.number().default(8090),
  CORS_ENABLED: z.coerce.boolean().default(true),
  LOG_LEVEL: logLevelSchema,
  LOG_COLORED: z.coerce.boolean().default(true),
  COMPRESSION_ENABLED: z.coerce.boolean().default(true),
  UPLOAD_ENABLED: z.coerce.boolean().default(true),
  GENERATE_CLIENT: z.coerce.boolean().default(true),
  GENERATE_API_DOCS: z.coerce.boolean().default(true),
  API_VERSION: z.coerce.string().default("0.0.1"),
  API_TITLE: z.coerce.string().default("node-api-template"),
  API_SERVER_URL: z.coerce.string().default("http://api.example.com/v1"),
  MONGO_URI: z.coerce.string().default("mongodb://127.0.0.1:27017"),
  MONGO_DB_NAME: z.coerce.string().default("node-api-template"),
  JWT_SECRET: z.coerce.string().default("secret"),
});

export const environment = z.enum(["production", "development"]);
