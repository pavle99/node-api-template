import { environment } from "@/schemas/app";

export const currentEnvironment = environment.parse(process.env.NODE_ENV);
export const isDevEnviroment: boolean = currentEnvironment === "development";
