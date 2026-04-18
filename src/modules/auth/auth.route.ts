import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { authValidation } from "./auth.validation";
import { authController } from "./auth.controller";
const authRoutes = express.Router();

authRoutes.post(
  "/seller/signup",
  validateRequest(authValidation.sellerCreateSchema),
  authController.createSeller
);
authRoutes.post(
  "/seller/signin",
  // validateRequest(authValidation.sellerCreateSchema),
  authController.loginSeller
);
authRoutes.post(
  "/user/signup",
  validateRequest(authValidation.userCreateSchema),
  authController.createUser
);
authRoutes.post(
  "/user/signin",
  // validateRequest(authValidation.userCreateSchema),
  authController.loginUser
);

export default authRoutes;
