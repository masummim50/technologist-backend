import { NextFunction, Request, RequestHandler, Response } from "express";

const catchAsync =
  (fn: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const allowedOrigins = ["http://localhost:3000"];
    const origin = req.headers.origin as string;

    if (allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }

    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");

    // Set specific allowed headers
    res.setHeader("Access-Control-Allow-Headers", "Authorization");

    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export default catchAsync;
