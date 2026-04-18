import express from "express";
import auth from "../../middleware/auth";
import { reviewController } from "./review.controller";

const reviewRoutes = express.Router();

reviewRoutes.post("/create/:id", auth("customer"), reviewController.addReview);

reviewRoutes.patch(
  "/update/:id",
  auth("customer"),
  reviewController.updateReview
);
reviewRoutes.get(
  "/:productId/:orderId",
  auth("customer"),
  reviewController.getReviewByUserIdAndProductId
);

export default reviewRoutes;
