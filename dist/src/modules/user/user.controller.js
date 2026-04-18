"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const user_service_1 = require("./user.service");
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const getUserById = (0, catchAsync_1.default)(async (req, res) => {
    const userId = req.params.id;
    const user = await user_service_1.userService.getUserById(userId);
    (0, sendResponse_1.default)(res, 200, true, "User retrieved successfully", user);
});
const getOrdersByUserId = (0, catchAsync_1.default)(async (req, res) => {
    console.log("hitting get orders");
    const userId = req.user.id;
    const user = await user_service_1.userService.getOrdersByUserId(userId);
    (0, sendResponse_1.default)(res, 200, true, "orders retrieved successfully", user);
});
const followStore = (0, catchAsync_1.default)(async (req, res) => {
    const userId = req.user.id;
    const storeId = req.params.id;
    const user = await user_service_1.userService.followStore(storeId, userId);
    (0, sendResponse_1.default)(res, 200, true, "store Followed successfully", user);
});
const unFollowStore = (0, catchAsync_1.default)(async (req, res) => {
    const userId = req.user.id;
    const storeId = req.params.id;
    const user = await user_service_1.userService.unFollowStore(storeId, userId);
    (0, sendResponse_1.default)(res, 200, true, "store Followed successfully", user);
});
exports.userController = {
    getUserById,
    getOrdersByUserId,
    followStore,
    unFollowStore,
};
