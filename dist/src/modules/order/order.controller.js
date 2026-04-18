"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const order_service_1 = require("./order.service");
const createOrder = (0, catchAsync_1.default)(async (req, res) => {
    const userId = req.user.id;
    const products = await order_service_1.orderService.createOrder(req.body, userId);
    (0, sendResponse_1.default)(res, 200, true, "cart decreased successfully", products);
});
const getOrderDetails = (0, catchAsync_1.default)(async (req, res) => {
    const role = req.user.role;
    const orderId = req.params.id;
    const products = await order_service_1.orderService.getOrderDetails(orderId, role);
    (0, sendResponse_1.default)(res, 200, true, "Order Details retrived successfully", products);
});
const getOrdersBySellerId = (0, catchAsync_1.default)(async (req, res) => {
    const sellerId = req.user.id;
    const orders = await order_service_1.orderService.getOrdersBySellerId(sellerId);
    (0, sendResponse_1.default)(res, 200, true, "Orders retrieved successfully", orders);
});
const acceptOrderById = (0, catchAsync_1.default)(async (req, res) => {
    const orderId = req.params.id;
    const order = await order_service_1.orderService.acceptOrderById(orderId);
    (0, sendResponse_1.default)(res, 200, true, "Order accepted successfully", order);
});
const cancelOrderById = (0, catchAsync_1.default)(async (req, res) => {
    const orderId = req.params.id;
    const order = await order_service_1.orderService.cancleOrderById(orderId);
    (0, sendResponse_1.default)(res, 200, true, "Order canceled successfully", order);
});
const shipOrderById = (0, catchAsync_1.default)(async (req, res) => {
    const orderId = req.params.id;
    const order = await order_service_1.orderService.shipOrderById(orderId);
    (0, sendResponse_1.default)(res, 200, true, "Order shipped successfully", order);
});
const deliverOrderById = (0, catchAsync_1.default)(async (req, res) => {
    const orderId = req.params.id;
    const order = await order_service_1.orderService.deliverOrderById(orderId);
    (0, sendResponse_1.default)(res, 200, true, "Order delivered successfully", order);
});
exports.orderController = {
    createOrder,
    getOrderDetails,
    getOrdersBySellerId,
    acceptOrderById,
    cancelOrderById,
    shipOrderById,
    deliverOrderById,
};
