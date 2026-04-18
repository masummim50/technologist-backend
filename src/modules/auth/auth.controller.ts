import { NextFunction, Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { authService } from "./auth.service";
import sendResponse from "../../shared/sendResponse";

const createSeller = catchAsync(async (req: Request, res: Response) => {
  const seller = await authService.createSeller(req.body);
  sendResponse(res, 200, true, "seller account created successfully", seller);
});
const loginSeller = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const data = await authService.loginSeller(email, password);
  res.cookie("accessToken", data.accessToken, { maxAge: 3600000 });
  sendResponse(res, 200, true, "seller logged In successfully", data);
});

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await authService.createUser(req.body);
  sendResponse(res, 200, true, "user account created successfully", user);
});
const loginUser = catchAsync(async (req: Request, res: Response) => {
  console.log("user login controller: ", req.body);
  const { email, password } = req.body;

  const data = await authService.loginUser(email, password);
  res.cookie("accessToken", data.accessToken, { maxAge: 3600000 });
  sendResponse(res, 200, true, "user logged In successfully", data);
});

export const authController = {
  createSeller,
  loginSeller,
  createUser,
  loginUser,
};
