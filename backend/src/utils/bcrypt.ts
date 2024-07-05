import * as bcrypt from "bcrypt";

export const encryptPassword = async (
  password: string,
  salt: string
): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const generateSalt = async (): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return salt;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const result = await bcrypt.compare(password, hashedPassword);
  return result;
};
