"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consoleroute = (message) => async (req, res, next) => {
    console.log(message);
    next();
};
exports.default = consoleroute;
