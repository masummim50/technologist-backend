"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import handleValidationError from '../../errors/handleValidationError';
const client_1 = require("../generated/prisma/client");
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../error/handleZodError"));
const apiError_1 = __importDefault(require("../shared/apiError"));
const globalErrorHandler = (error, req, res, next) => {
    let statusCode = 500;
    let message = 'Something went wrong !';
    let errorMessages = [];
    if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
            const fields = error.meta?.target;
            statusCode = 400;
            let entries = '';
            fields.forEach(t => (entries = entries + t + ','));
            message = `duplicate entry - ${entries}`;
        }
        if (error.code === 'P2025') {
            message = error.meta?.cause;
        }
    }
    else if (error instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if (error instanceof apiError_1.default) {
        statusCode = error?.statusCode;
        message = error.message;
        errorMessages = error?.message
            ? [
                {
                    path: '',
                    message: error?.message,
                },
            ]
            : [];
    }
    else if (error instanceof Error) {
        message = error?.message;
        errorMessages = error?.message
            ? [
                {
                    path: '',
                    message: error?.message,
                },
            ]
            : [];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: process.env.NODE_ENV !== 'production' ? error?.stack : undefined,
    });
};
exports.default = globalErrorHandler;
