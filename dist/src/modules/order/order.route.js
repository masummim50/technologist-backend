"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const order_controller_1 = require("./order.controller");
const orderRoutes = express_1.default.Router();
orderRoutes.get("/", (0, auth_1.default)("seller"), 
//   validateRequest(sellerValidation.storeCreateSchema),
order_controller_1.orderController.getOrdersBySellerId);
orderRoutes.post("/create-order", (0, auth_1.default)("customer"), 
//   validateRequest(sellerValidation.storeCreateSchema),
order_controller_1.orderController.createOrder);
orderRoutes.patch("/accept/:id", (0, auth_1.default)("seller"), 
//   validateRequest(sellerValidation.storeCreateSchema),
order_controller_1.orderController.acceptOrderById);
orderRoutes.patch("/cancel/:id", (0, auth_1.default)("seller"), 
//   validateRequest(sellerValidation.storeCreateSchema),
order_controller_1.orderController.cancelOrderById);
orderRoutes.patch("/ship/:id", (0, auth_1.default)("seller"), 
//   validateRequest(sellerValidation.storeCreateSchema),
order_controller_1.orderController.shipOrderById);
orderRoutes.patch("/deliver/:id", (0, auth_1.default)("customer"), 
//   validateRequest(sellerValidation.storeCreateSchema),
order_controller_1.orderController.deliverOrderById);
orderRoutes.get("/:id", (0, auth_1.default)("customer", "seller"), 
//   validateRequest(sellerValidation.storeCreateSchema),
order_controller_1.orderController.getOrderDetails);
exports.default = orderRoutes;
