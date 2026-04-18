import { prisma } from "../../shared/prisma";
const getReviewByUserIdAndProductId = async (userId, productId, orderId) => {
    const review = await prisma.review.findFirst({
        where: { userId, productId, orderId },
    });
    return review;
};
const addReview = async (data) => {
    const review = await prisma.review.create({ data: data });
    return review;
};
const updateReview = async (reviewId, data) => {
    const review = await prisma.review.update({
        where: { id: reviewId },
        data: data,
    });
    return review;
};
export const reviewService = {
    getReviewByUserIdAndProductId,
    addReview,
    updateReview,
};
