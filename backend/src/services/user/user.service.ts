import { type IUser } from "../../types/models";
import User from "../../models/user.model";

const create = async (
  name: string,
  email: string,
  password: string,
  salt: string
): Promise<IUser> => {
  const user = await User.create({
    name,
    email,
    password,
    salt,
  });
  return user;
};

const findOneByEmail = async (
  email: string,
  showPassword: boolean = false
): Promise<IUser | null> => {
  // include salt aswell when showPassword is true
  if (showPassword) {
    return (await User.findOne({
      email,
    }).select("+password +salt")) as IUser | null;
  }
  return await User.findOne({ email });
};

const findOneById = async (id: string): Promise<IUser | null> => {
  return await User.findOne({ _id: id });
};

const userService = {
  create,
  findOneByEmail,
  findOneById,
};

export default userService;
