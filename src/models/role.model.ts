import mongoose, { HydratedDocumentFromSchema, InferSchemaType } from "mongoose";

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ["user", "moderator", "admin"],
    default: "user",
    unique: true,
  },
});

export const Role = mongoose.model("Role", RoleSchema);

export type THydratedRole = HydratedDocumentFromSchema<typeof RoleSchema>;

export type TRole = InferSchemaType<typeof RoleSchema>;
