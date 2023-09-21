import { withMeta } from "express-zod-api";
import { z } from "zod";

export const registerInputSchema = withMeta(
  z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
    roles: z.array(z.string()).optional(),
  }),
).example({
  username: "username",
  email: "example@gmail.com",
  password: "password",
  roles: ["user"],
});
export const registerOutputSchema = withMeta(
  z.object({
    message: z.string(),
  }),
).example({
  message: "User was registered successfully!",
});

export const loginInputSchema = withMeta(
  z.object({
    username: z.string(),
    password: z.string(),
  }),
).example({
  username: "username",
  password: "password",
});
export const loginOutputSchema = withMeta(
  z.object({
    id: z.string(),
    username: z.string(),
    email: z.string(),
    roles: z.array(z.string()),
    accessToken: z.string(),
  }),
).example({
  id: "60a0d0f9e0d6a53d3c9d6a2c",
  username: "username",
  email: "example@gmail.com",
  roles: ["user"],
  accessToken: "jwt-token-example",
});
