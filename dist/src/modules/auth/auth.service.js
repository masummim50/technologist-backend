"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = require("../../shared/prisma");
const excludeField_1 = __importDefault(require("../../shared/excludeField"));
const apiError_1 = __importDefault(require("../../shared/apiError"));
const bcrypt_2 = require("../../shared/bcrypt");
const jwt_1 = require("../../shared/jwt");
// seller related services
const createSeller = async (seller) => {
    const userExist = await prisma_1.prisma.user.findUnique({
        where: { email: seller.email },
    });
    if (userExist) {
        throw new apiError_1.default(400, "Email Already exists");
    }
    seller.password = bcrypt_1.default.hashSync(seller.password, 10);
    const result = await prisma_1.prisma.seller.create({ data: seller });
    const withoutPassword = (0, excludeField_1.default)(result, ["password"]);
    return withoutPassword;
};
const loginSeller = async (email, password) => {
    const seller = await prisma_1.prisma.seller.findUnique({ where: { email: email } });
    if (!seller) {
        throw new apiError_1.default(400, "Invalid credentials/seller not found with that email");
    }
    const matchPassword = bcrypt_2.bcryptFunctions.verifyPassword(seller.password, password);
    if (!matchPassword) {
        throw new apiError_1.default(400, "Invalid credentials/incorrect email or password");
    }
    const payload = {
        id: seller.id,
        name: seller.name,
        email: seller.email,
        role: seller.role,
    };
    const token = jwt_1.jwtFunctions.generateToken(payload);
    const responseData = {
        user: payload,
        accessToken: token,
    };
    return responseData;
};
// user related services
const createUser = async (user) => {
    const userExist = await prisma_1.prisma.seller.findUnique({
        where: { email: user.email },
    });
    if (userExist) {
        throw new apiError_1.default(400, "Email Already exists");
    }
    user.password = bcrypt_1.default.hashSync(user.password, 10);
    const result = await prisma_1.prisma.user.create({ data: user });
    const withoutPassword = (0, excludeField_1.default)(result, ["password"]);
    return withoutPassword;
};
const loginUser = async (email, password) => {
    const user = await prisma_1.prisma.user.findUnique({ where: { email: email } });
    if (!user) {
        throw new apiError_1.default(400, "Invalid credentials/user not found with that email");
    }
    const matchPassword = bcrypt_2.bcryptFunctions.verifyPassword(user.password, password);
    if (!matchPassword) {
        throw new apiError_1.default(400, "Invalid credentials/incorrect email or password");
    }
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    };
    const token = jwt_1.jwtFunctions.generateToken(payload);
    const responseData = { user: payload, accessToken: token };
    return responseData;
};
exports.authService = {
    createSeller,
    loginSeller,
    createUser,
    loginUser,
};
