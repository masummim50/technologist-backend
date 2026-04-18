import catchAsync from "../../shared/catchAsync";
import { userService } from "./user.service";
import sendResponse from "../../shared/sendResponse";
const getUserById = catchAsync(async (req, res) => {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);
    sendResponse(res, 200, true, "User retrieved successfully", user);
});
const getOrdersByUserId = catchAsync(async (req, res) => {
    console.log("hitting get orders");
    const userId = req.user.id;
    const user = await userService.getOrdersByUserId(userId);
    sendResponse(res, 200, true, "orders retrieved successfully", user);
});
const followStore = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const storeId = req.params.id;
    const user = await userService.followStore(storeId, userId);
    sendResponse(res, 200, true, "store Followed successfully", user);
});
const unFollowStore = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const storeId = req.params.id;
    const user = await userService.unFollowStore(storeId, userId);
    sendResponse(res, 200, true, "store Followed successfully", user);
});
export const userController = {
    getUserById,
    getOrdersByUserId,
    followStore,
    unFollowStore,
};
