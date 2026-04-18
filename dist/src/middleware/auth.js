"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiError_1 = __importDefault(require("../shared/apiError"));
const jwt_1 = require("../shared/jwt");
const auth = (...requiredRoles) => async (req, res, next) => {
    try {
        //get authorization token
        // console.log("consoling req.headers: ", req.headers);
        const token = req.headers.authorization?.split(" ")[1];
        console.log("token from auth.ts file backend: ", token);
        if (!token) {
            throw new apiError_1.default(400, "You are not authorized");
        }
        // verify token
        let verifiedUser = null;
        verifiedUser = jwt_1.jwtFunctions.verifyToken(token);
        console.log("decoded user: ", verifiedUser);
        req.user = verifiedUser; // role  , userid
        if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
            throw new apiError_1.default(400, "You are not authorized");
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = auth;
