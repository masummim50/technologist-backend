import { NextFunction, Request, Response } from "express";

import { Secret } from "jsonwebtoken";
import ApiError from "../shared/apiError";

const consoleroute =
  (message: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(message);
    next();
  };

export default consoleroute;
