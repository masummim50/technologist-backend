import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { orderService } from "./order.service";
const createOrder = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const products = await orderService.createOrder(req.body, userId);
    sendResponse(res, 200, true, "cart decreased successfully", products);
});
const getOrderDetails = catchAsync(async (req, res) => {
    const role = req.user.role;
    const orderId = req.params.id;
    const products = await orderService.getOrderDetails(orderId, role);
    sendResponse(res, 200, true, "Order Details retrived successfully", products);
});
const getOrdersBySellerId = catchAsync(async (req, res) => {
    const sellerId = req.user.id;
    const orders = await orderService.getOrdersBySellerId(sellerId);
    sendResponse(res, 200, true, "Orders retrieved successfully", orders);
});
const acceptOrderById = catchAsync(async (req, res) => {
    const orderId = req.params.id;
    const order = await orderService.acceptOrderById(orderId);
    sendResponse(res, 200, true, "Order accepted successfully", order);
});
const cancelOrderById = catchAsync(async (req, res) => {
    const orderId = req.params.id;
    const order = await orderService.cancleOrderById(orderId);
    sendResponse(res, 200, true, "Order canceled successfully", order);
});
const shipOrderById = catchAsync(async (req, res) => {
    const orderId = req.params.id;
    const order = await orderService.shipOrderById(orderId);
    sendResponse(res, 200, true, "Order shipped successfully", order);
});
const deliverOrderById = catchAsync(async (req, res) => {
    const orderId = req.params.id;
    const order = await orderService.deliverOrderById(orderId);
    sendResponse(res, 200, true, "Order delivered successfully", order);
});
export const orderController = {
    createOrder,
    getOrderDetails,
    getOrdersBySellerId,
    acceptOrderById,
    cancelOrderById,
    shipOrderById,
    deliverOrderById,
};
