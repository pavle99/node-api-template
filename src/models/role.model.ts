import mongoose, { HydratedDocumentFromSchema, InferSchemaType } from "mongoose";

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export const Role = mongoose.model("Role", RoleSchema);

export type THydratedRole = HydratedDocumentFromSchema<typeof RoleSchema>;

export type TRole = InferSchemaType<typeof RoleSchema>;
