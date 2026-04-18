"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const auth_controller_1 = require("./auth.controller");
const authRoutes = express_1.default.Router();
authRoutes.post("/seller/signup", (0, validateRequest_1.default)(auth_validation_1.authValidation.sellerCreateSchema), auth_controller_1.authController.createSeller);
authRoutes.post("/seller/signin", 
// validateRequest(authValidation.sellerCreateSchema),
auth_controller_1.authController.loginSeller);
authRoutes.post("/user/signup", (0, validateRequest_1.default)(auth_validation_1.authValidation.userCreateSchema), auth_controller_1.authController.createUser);
authRoutes.post("/user/signin", 
// validateRequest(authValidation.userCreateSchema),
auth_controller_1.authController.loginUser);
exports.default = authRoutes;
