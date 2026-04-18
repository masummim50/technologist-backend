import { connect } from "http2";
import ApiError from "../../shared/apiError";
import excludeField from "../../shared/excludeField";
import prisma from "../../shared/prisma";

const getReviewByUserIdAndProductId = async (
  userId: string,
  productId: string,
  orderId: string
) => {
  const review = await prisma.review.findFirst({
    where: { userId, productId, orderId },
  });

  return review;
};

const addReview = async (data: any) => {
  const review = await prisma.review.create({ data: data });
  return review;
};

const updateReview = async (reviewId: string, data: any) => {
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
