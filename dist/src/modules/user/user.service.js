"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const apiError_1 = __importDefault(require("../../shared/apiError"));
const excludeField_1 = __importDefault(require("../../shared/excludeField"));
const prisma_1 = require("../../shared/prisma");
const getUserById = async (userId) => {
    console.log("userservice");
    const result = await prisma_1.prisma.user.findUnique({ where: { id: userId } });
    console.log("result: ", result);
    if (result) {
        console.log("result: ", result);
        const user = (0, excludeField_1.default)(result, ["password"]);
        return user;
    }
    else {
        throw new apiError_1.default(400, "user not found");
    }
};
const getOrdersByUserId = async (userId) => {
    const orders = await prisma_1.prisma.order.findMany({
        where: { userId },
        orderBy: {
            updatedAt: "desc",
        },
    });
    return orders;
};
const followStore = async (storeId, userId) => {
    const update = await prisma_1.prisma.store.update({
        where: { id: storeId },
        data: { followers: { connect: { id: userId } } },
    });
    return update;
};
const unFollowStore = async (storeId, userId) => {
    const update = await prisma_1.prisma.store.update({
        where: { id: storeId },
        data: { followers: { disconnect: { id: userId } } },
    });
    return update;
};
exports.userService = {
    getUserById,
    getOrdersByUserId,
    followStore,
    unFollowStore,
};
