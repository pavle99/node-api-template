import { Role } from "@/models/role.model";
import { User } from "@/models/user.model";
import { createHttpError, createMiddleware, withMeta } from "express-zod-api";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { envConfig } from "@/configs/env.config";

export const checkDuplicateUsernameOrEmailMiddleware = createMiddleware({
  input: withMeta(
    z.object({
      username: z.string().min(1),
      email: z.string().email(),
    }),
  ).example({
    username: "username",
    email: "example@gmail.com",
  }),
  middleware: async ({ input: { email, username }, logger }) => {
    logger.debug(`Checking whether username ${username} and email ${email} already exist...`);

    const user = await User.findOne({ username });

    if (user) {
      throw createHttpError(400, "This username is already in use!");
    }

    const user2 = await User.findOne({ email });

    if (user2) {
      throw createHttpError(400, "This email is already in use!");
    }

    return { email, username };
  },
});

export const checkRolesExistedMiddleware = createMiddleware({
  input: withMeta(
    z.object({
      roles: z.array(z.string()),
    }),
  ).example({
    roles: ["user", "moderator", "admin"],
  }),
  middleware: async ({ input: { roles }, logger }) => {
    logger.debug(`Checking whether roles ${roles} exist...`);

    const rolesFound = await Promise.all(
      roles.map(async (role) => {
        const roleFound = await Role.findOne({ name: role });
        if (!roleFound) {
          throw createHttpError(404, `Role ${role} does not exist!`);
        }
        return roleFound;
      }),
    );

    return { rolesFound };
  },
});

export const verifyTokenMiddleware = createMiddleware({
  security: {
    and: [{ type: "header", name: "Authorization" }],
  },
  input: withMeta(z.object({})).example({}),
  middleware: async ({ request, logger }) => {
    logger.debug("Verifying token...");

    const token = request.headers.authorization;

    if (!token) {
      throw createHttpError(401, "No token provided!");
    }

    jwt.verify(token, envConfig.JWT_SECRET, (err, decoded) => {
      if (err) {
        throw createHttpError(401, "Invalid token!");
      }

      if (!(typeof decoded === "string")) {
        request.userId = decoded.id;
      }
    });

    return { token };
  },
});

export const isModeratorMiddleware = createMiddleware({
  input: withMeta(z.object({})).example({}),
  middleware: async ({ request, logger }) => {
    logger.debug("Checking whether user is moderator...");

    const user = await User.findById({ _id: request.userId });
    const roles = await Role.find({ _id: { $in: user.roles } });

    if (roles.some((role) => role.name === "moderator")) return {};

    throw createHttpError(403, "Require Moderator Role!");
  },
});

export const isAdminMiddleware = createMiddleware({
  input: withMeta(z.object({})).example({}),
  middleware: async ({ request, logger }) => {
    logger.debug("Checking whether user is admin...");

    const user = await User.findById({ _id: request.userId });
    const role = await Role.findOne({ _id: { $in: user.roles } });

    if (role.name === "admin") return {};

    throw createHttpError(403, "Require Admin Role!");
  },
});
