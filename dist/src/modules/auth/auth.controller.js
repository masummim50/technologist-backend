"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const auth_service_1 = require("./auth.service");
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const createSeller = (0, catchAsync_1.default)(async (req, res) => {
    const seller = await auth_service_1.authService.createSeller(req.body);
    (0, sendResponse_1.default)(res, 200, true, "seller account created successfully", seller);
});
const loginSeller = (0, catchAsync_1.default)(async (req, res) => {
    const { email, password } = req.body;
    const data = await auth_service_1.authService.loginSeller(email, password);
    res.cookie("accessToken", data.accessToken, { maxAge: 3600000 });
    (0, sendResponse_1.default)(res, 200, true, "seller logged In successfully", data);
});
const createUser = (0, catchAsync_1.default)(async (req, res) => {
    const user = await auth_service_1.authService.createUser(req.body);
    (0, sendResponse_1.default)(res, 200, true, "user account created successfully", user);
});
const loginUser = (0, catchAsync_1.default)(async (req, res) => {
    console.log("user login controller: ", req.body);
    const { email, password } = req.body;
    const data = await auth_service_1.authService.loginUser(email, password);
    res.cookie("accessToken", data.accessToken, { maxAge: 3600000 });
    (0, sendResponse_1.default)(res, 200, true, "user logged In successfully", data);
});
exports.authController = {
    createSeller,
    loginSeller,
    createUser,
    loginUser,
};
