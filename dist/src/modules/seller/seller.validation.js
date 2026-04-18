"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sellerValidation = void 0;
const zod_1 = require("zod");
const storeCreateSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'store name is required' }),
        description: zod_1.z.string({ required_error: 'description is required' }),
    })
});
exports.sellerValidation = {
    storeCreateSchema
};
