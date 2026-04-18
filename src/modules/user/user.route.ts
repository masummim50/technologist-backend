import express from "express";
import { userService } from "./user.service";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";

const userRoutes = express.Router();

userRoutes.get("/orders", auth("customer"), userController.getOrdersByUserId);
userRoutes.get("/:id", userController.getUserById);

userRoutes.patch(
  "/followstore/:id",
  auth("customer"),
  userController.followStore
);
userRoutes.patch(
  "/unfollowstore/:id",
  auth("customer"),
  userController.unFollowStore
);

export default userRoutes;
