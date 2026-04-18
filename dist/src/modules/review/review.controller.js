import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { reviewService } from "./review.service";
const getReviewByUserIdAndProductId = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const { productId, orderId } = req.params;
    const review = await reviewService.getReviewByUserIdAndProductId(userId, productId, orderId);
    sendResponse(res, 200, true, "review retrieved successfully", review);
});
const addReview = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const productId = req.params.id;
    const data = { ...req.body, productId, userId };
    const review = await reviewService.addReview(data);
    sendResponse(res, 200, true, "review created successfully", review);
});
const updateReview = catchAsync(async (req, res) => {
    console.log("update controller");
    const reviewId = req.params.id;
    const data = { ...req.body };
    const review = await reviewService.updateReview(reviewId, data);
    sendResponse(res, 200, true, "review updated successfully", review);
});
export const reviewController = {
    getReviewByUserIdAndProductId,
    addReview,
    updateReview,
};
