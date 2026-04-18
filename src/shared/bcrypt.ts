import bcrypt from "bcrypt";

const verifyPassword = (
  hashedPassword: string,
  plainPassword: string
): boolean => {
  const match = bcrypt.compareSync(plainPassword, hashedPassword);
  return match;
};


export const bcryptFunctions = {
    verifyPassword
}