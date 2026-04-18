import jwt from "jsonwebtoken";
import { eVariables } from "../env";
const generateToken = (data) => {
    const token = jwt.sign(data, eVariables.JWT_SECRET_KEY, {
        expiresIn: "365days",
    });
    return token;
};
const verifyToken = (token) => {
    const decoded = jwt.verify(token, eVariables.JWT_SECRET_KEY);
    return decoded;
};
export const jwtFunctions = {
    generateToken,
    verifyToken
};
