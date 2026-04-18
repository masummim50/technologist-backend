"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync = (fn) => async (req, res, next) => {
    const allowedOrigins = ["http://localhost:3000"];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    // Set specific allowed headers
    res.setHeader("Access-Control-Allow-Headers", "Authorization");
    try {
        await fn(req, res, next);
    }
    catch (error) {
        next(error);
    }
};
exports.default = catchAsync;
