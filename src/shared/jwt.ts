import jwt from "jsonwebtoken";
import { eVariables } from "../env";

type JwtPayload = {
    id: string;
    name: string;
    email: string;
    role: string;
};
const generateToken = (data: any) => {
  const token = jwt.sign(data, eVariables.JWT_SECRET_KEY as string, {
    expiresIn: "365days",
  });
  return token;
};

const verifyToken = (token:string):JwtPayload=> {
    const decoded = jwt.verify(token, eVariables.JWT_SECRET_KEY as string) as JwtPayload;
    return decoded;
}

export const jwtFunctions = {
  generateToken,
  verifyToken
};
