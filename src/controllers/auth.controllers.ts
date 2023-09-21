import { taggedEndpointsFactory } from "@/factories/tagged-endpoints.factory";
import {
  checkDuplicateUsernameOrEmailMiddleware,
  checkRolesExistedMiddleware,
} from "@/middlewares/auth.middleware";
import { User } from "@/models/user.model";
import {
  loginInputSchema,
  loginOutputSchema,
  registerInputSchema,
  registerOutputSchema,
} from "@/schemas/auth";
import { registerUser } from "@/services/auth.service";
import { safeAsync } from "@/utils/catcher";
import bcrypt from "bcrypt";
import { createHttpError } from "express-zod-api";
import jwt from "jsonwebtoken";

export const registerEndpoint = taggedEndpointsFactory
  .addMiddleware(checkDuplicateUsernameOrEmailMiddleware)
  .addMiddleware(checkRolesExistedMiddleware)
  .build({
    tag: "auth",
    method: "post",
    input: registerInputSchema,
    output: registerOutputSchema,
    handler: async ({ input: { username, email, password, roles }, logger }) => {
      logger.debug(`Registering user ${username} with email ${email} and roles ${roles}...`);

      const registrationResult = await safeAsync(
        async () => await registerUser({ username, email, password, roles }),
      );

      if (registrationResult.ok === false) {
        return { message: registrationResult.data };
      }

      return { message: "User was registered successfully!" };
    },
  });

export const loginEndpoint = taggedEndpointsFactory.build({
  tag: "auth",
  method: "post",
  input: loginInputSchema,
  output: loginOutputSchema,
  handler: async ({ input: { username, password }, logger }) => {
    logger.debug(`Logging in user ${username}...`);

    const user = await User.findOne({ username }).populate("roles", "-__v");

    if (!user) throw createHttpError(404, "User not found");

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) throw createHttpError(401, "Invalid password");

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: 60 * 60 * 24, // 24 hours
      allowInsecureKeySizes: true,
    });

    const roles = user.roles.map((role) => role.name);

    return {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      roles,
      accessToken,
    };
  },
});
