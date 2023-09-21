import { loginEndpoint, registerEndpoint } from "@/controllers/auth.controllers";
import {
  getUserEndpoint,
  getUsersAdminController,
  getUsersController,
  getUsersModController,
  updateUserEndpoint,
} from "@/controllers/users.controllers";
import { DependsOnMethod, Routing } from "express-zod-api";

export const routing: Routing = {
  v1: {
    login: loginEndpoint,
    register: registerEndpoint,
    users: {
      "": new DependsOnMethod({
        get: getUsersController,
      }),
      mod: getUsersModController,
      admin: getUsersAdminController,
      ":id": new DependsOnMethod({
        get: getUserEndpoint,
        post: updateUserEndpoint,
      }),
    },
  },
};
