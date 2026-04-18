"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bcryptFunctions = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const verifyPassword = (hashedPassword, plainPassword) => {
    const match = bcrypt_1.default.compareSync(plainPassword, hashedPassword);
    return match;
};
exports.bcryptFunctions = {
    verifyPassword
};
