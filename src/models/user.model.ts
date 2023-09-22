import mongoose, { HydratedDocumentFromSchema, InferSchemaType } from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
});

export const User = mongoose.model("User", UserSchema);

export type THydratedUser = HydratedDocumentFromSchema<typeof UserSchema>;

export type TUser = InferSchemaType<typeof UserSchema>;
