"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtFunctions = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../env");
const generateToken = (data) => {
    const token = jsonwebtoken_1.default.sign(data, env_1.eVariables.JWT_SECRET_KEY, {
        expiresIn: "365days",
    });
    return token;
};
const verifyToken = (token) => {
    const decoded = jsonwebtoken_1.default.verify(token, env_1.eVariables.JWT_SECRET_KEY);
    return decoded;
};
exports.jwtFunctions = {
    generateToken,
    verifyToken
};
