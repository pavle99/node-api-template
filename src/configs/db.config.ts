/* eslint-disable no-console */

import mongoose from "mongoose";

import { envConfig } from "@/configs/env.config";
import { Role } from "@/models/role.model";

export const connectToDB = async () => {
  mongoose
    .connect(envConfig.MONGO_URI, {
      dbName: envConfig.MONGO_DB_NAME,
    })
    .then(async () => {
      console.log("Connected to MongoDB");
      await initialize();
    })
    .catch((err) => {
      console.error("Connecting to DB errored:\n", err);
    });
};

const initialize = async () => {
  const roles = await Role.find().estimatedDocumentCount();
  if (roles !== 0) return;

  console.log("No roles found, creating new ones...");

  const newRoles = await Role.insertMany([
    { name: "user" },
    { name: "moderator" },
    { name: "admin" },
  ]);

  console.log("Roles created:\n", newRoles);
};
