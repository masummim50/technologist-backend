"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewController = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const review_service_1 = require("./review.service");
const getReviewByUserIdAndProductId = (0, catchAsync_1.default)(async (req, res) => {
    const userId = req.user.id;
    const { productId, orderId } = req.params;
    const review = await review_service_1.reviewService.getReviewByUserIdAndProductId(userId, productId, orderId);
    (0, sendResponse_1.default)(res, 200, true, "review retrieved successfully", review);
});
const addReview = (0, catchAsync_1.default)(async (req, res) => {
    const userId = req.user.id;
    const productId = req.params.id;
    const data = { ...req.body, productId, userId };
    const review = await review_service_1.reviewService.addReview(data);
    (0, sendResponse_1.default)(res, 200, true, "review created successfully", review);
});
const updateReview = (0, catchAsync_1.default)(async (req, res) => {
    console.log("update controller");
    const reviewId = req.params.id;
    const data = { ...req.body };
    const review = await review_service_1.reviewService.updateReview(reviewId, data);
    (0, sendResponse_1.default)(res, 200, true, "review updated successfully", review);
});
exports.reviewController = {
    getReviewByUserIdAndProductId,
    addReview,
    updateReview,
};
