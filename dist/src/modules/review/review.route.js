"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const review_controller_1 = require("./review.controller");
const reviewRoutes = express_1.default.Router();
reviewRoutes.post("/create/:id", (0, auth_1.default)("customer"), review_controller_1.reviewController.addReview);
reviewRoutes.patch("/update/:id", (0, auth_1.default)("customer"), review_controller_1.reviewController.updateReview);
reviewRoutes.get("/:productId/:orderId", (0, auth_1.default)("customer"), review_controller_1.reviewController.getReviewByUserIdAndProductId);
exports.default = reviewRoutes;
