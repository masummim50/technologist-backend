/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
// import config from '../../config';
// import ApiError from '../../errors/ApiError';

import { ZodError } from "zod";
import prisma from "./prisma";
import { Prisma } from "@prisma/client";
// import handleZodError from '../../errors/handleZodError';
// import { IGenericErrorMessage } from '../../interfaces/error';

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("global error handler beginning", error);
  let statusCode = 400;
  let message = "Something went wrong !";
  let errorMessages = [];

  if (error instanceof ZodError) {
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
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      statusCode = 403
      message = 'Email already exists'
      errorMessages= [{path:'email', message:'duplicate entry/email already exists'}]
    }
  } else if (error instanceof Error) {
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

export default globalErrorHandler;
