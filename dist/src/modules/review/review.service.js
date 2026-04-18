"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewService = void 0;
const prisma_1 = require("../../shared/prisma");
const getReviewByUserIdAndProductId = async (userId, productId, orderId) => {
    const review = await prisma_1.prisma.review.findFirst({
        where: { userId, productId, orderId },
    });
    return review;
};
const addReview = async (data) => {
    const review = await prisma_1.prisma.review.create({ data: data });
    return review;
};
const updateReview = async (reviewId, data) => {
    const review = await prisma_1.prisma.review.update({
        where: { id: reviewId },
        data: data,
    });
    return review;
};
exports.reviewService = {
    getReviewByUserIdAndProductId,
    addReview,
    updateReview,
};
