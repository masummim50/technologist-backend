"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const zod_1 = require("zod");
const sellerCreateSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'name is required' }),
        email: zod_1.z.string({ required_error: 'email is required' }),
        password: zod_1.z.string({ required_error: 'password is required' }),
        role: zod_1.z.enum(["seller"]).default("seller")
    })
});
const userCreateSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'name is required' }),
        email: zod_1.z.string({ required_error: 'email is required' }),
        password: zod_1.z.string({ required_error: 'password is required' }),
        role: zod_1.z.enum(["user"]).default("user")
    })
});
exports.authValidation = {
    sellerCreateSchema,
    userCreateSchema
};
