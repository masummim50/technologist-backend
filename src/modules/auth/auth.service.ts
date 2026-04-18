import bcrypt from "bcrypt";
import prisma from "../../shared/prisma";
import excludeField from "../../shared/excludeField";
import ApiError from "../../shared/apiError";
import { sellerType } from "../seller/seller.interface";
import { userType } from "../user/user.interface";
import { bcryptFunctions } from "../../shared/bcrypt";
import { jwtFunctions } from "../../shared/jwt";

// seller related services
const createSeller = async (seller: sellerType) => {
  const userExist = await prisma.user.findUnique({
    where: { email: seller.email },
  });
  if (userExist) {
    throw new ApiError(400, "Email Already exists");
  }
  seller.password = bcrypt.hashSync(seller.password, 10);
  const result = await prisma.seller.create({ data: seller });
  const withoutPassword = excludeField(result, ["password"]);
  return withoutPassword;
};

const loginSeller = async (email: string, password: string) => {
  const seller = await prisma.seller.findUnique({ where: { email: email } });
  if (!seller) {
    throw new ApiError(
      400,
      "Invalid credentials/seller not found with that email"
    );
  }
  const matchPassword = bcryptFunctions.verifyPassword(
    seller.password,
    password
  );
  if (!matchPassword) {
    throw new ApiError(400, "Invalid credentials/incorrect email or password");
  }
  const payload = {
    id: seller.id,
    name: seller.name,
    email: seller.email,
    role: seller.role,
  };
  const token = jwtFunctions.generateToken(payload);
  const responseData = {
    user: payload,
    accessToken: token,
  };
  return responseData;
};

// user related services
const createUser = async (user: userType) => {
  const userExist = await prisma.seller.findUnique({
    where: { email: user.email },
  });
  if (userExist) {
    throw new ApiError(400, "Email Already exists");
  }
  user.password = bcrypt.hashSync(user.password, 10);
  const result = await prisma.user.create({ data: user });
  const withoutPassword = excludeField(result, ["password"]);
  return withoutPassword;
};
const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email: email } });
  if (!user) {
    throw new ApiError(
      400,
      "Invalid credentials/user not found with that email"
    );
  }
  const matchPassword = bcryptFunctions.verifyPassword(user.password, password);
  if (!matchPassword) {
    throw new ApiError(400, "Invalid credentials/incorrect email or password");
  }
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  const token = jwtFunctions.generateToken(payload);
  const responseData = { user: payload, accessToken: token };
  return responseData;
};

export const authService = {
  createSeller,
  loginSeller,
  createUser,
  loginUser,
};
