"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const globalErrorHandler = (error, req, res, next) => {
    console.log("global error handler beginning", error);
    let statusCode = 400;
    let message = "Something went wrong !";
    let errorMessages = [];
    if (error instanceof zod_1.ZodError) {
        // console.log("zod error recieved", error);
        message = "validation failed";
        errorMessages = [
            error.issues.map((issue) => {
                return {
                    path: issue.path[issue.path.length - 1],
                    message: issue.message,
                };
            }),
        ];
    }
    // else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    //   if (error.code === "P2002") {
    //     statusCode = 403
    //     message = 'Email already exists'
    //     errorMessages= [{path:'email', message:'duplicate entry/email already exists'}]
    //   }
    // } 
    else if (error instanceof Error) {
        console.log("error instance of error");
        message = error?.message;
        errorMessages = error?.message
            ? [
                {
                    path: "",
                    message: error?.message,
                },
            ]
            : [];
    }
    res.status(statusCode).json({
        success: false,
        message: message,
        errorMessages,
        // stack: config.env !== 'production' ? error?.stack : undefined,
    });
};
exports.default = globalErrorHandler;
