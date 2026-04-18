"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const userRoutes = express_1.default.Router();
userRoutes.get("/orders", (0, auth_1.default)("customer"), user_controller_1.userController.getOrdersByUserId);
userRoutes.get("/:id", user_controller_1.userController.getUserById);
userRoutes.patch("/followstore/:id", (0, auth_1.default)("customer"), user_controller_1.userController.followStore);
userRoutes.patch("/unfollowstore/:id", (0, auth_1.default)("customer"), user_controller_1.userController.unFollowStore);
exports.default = userRoutes;
