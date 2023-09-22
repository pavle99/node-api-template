import bcrypt from "bcrypt";

import { Role } from "@/models/role.model";
import { User } from "@/models/user.model";

interface IRegisterUser {
  username: string;
  email: string;
  password: string;
  roles: string[];
}

export const registerUser = async ({ username, email, password, roles }: IRegisterUser) => {
  const user = await User.create({
    username,
    email,
    password: await bcrypt.hash(password, 8),
  });

  if (roles) {
    const rolesFound = await Role.find({ name: { $in: roles } });
    user.roles = rolesFound.map((role) => role._id);
    await user.save();
  } else {
    const role = await Role.findOne({ name: "user" });

    if (!role) throw new Error("Role user not found");

    user.roles = [role._id];
    await user.save();
  }
};
