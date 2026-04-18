import bcrypt from "bcrypt";
const verifyPassword = (hashedPassword, plainPassword) => {
    const match = bcrypt.compareSync(plainPassword, hashedPassword);
    return match;
};
export const bcryptFunctions = {
    verifyPassword
};
