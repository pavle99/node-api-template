import { ez, withMeta } from "express-zod-api";
import { z } from "zod";

export const getUsersInputSchema = withMeta(z.object({})).example({});
export const getUsersOutputSchema = withMeta(
  z.object({
    demoData: z.string(),
  }),
).example({
  demoData: "Querying all users succeed!",
});

export const getUserInputSchema = withMeta(
  z.object({
    id: z
      .string()
      .trim()
      .regex(/\d+/)
      .transform((id) => parseInt(id, 10))
      .describe("a numeric string containing the id of the user"),
    queryParam: z.array(z.string()).optional(),
  }),
).example({
  id: "12",
  queryParam: ["foo", "bar"],
});
export const getUserOutputSchema = withMeta(
  z.object({
    demoData: z.string(),
  }),
).example({
  demoData: "Querying User 12 succeed!",
});

export const updateUserInputSchema = withMeta(
  z.object({
    id: z
      .string()
      .trim()
      .regex(/\d+/)
      .transform((id) => parseInt(id, 10))
      .describe("a numeric string containing the id of the user"),
    name: z.string().min(1),
  }),
).example({
  id: "12",
  name: "John Doe",
});
export const updateUserOutputSchema = withMeta(
  z.object({
    name: z.string(),
    createdAt: ez.dateOut(),
  }),
).example({
  name: "John Doe",
  createdAt: new Date("2021-12-31"),
});
