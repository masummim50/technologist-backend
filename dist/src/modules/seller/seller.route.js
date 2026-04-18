"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const seller_controller_1 = require("./seller.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const seller_validation_1 = require("./seller.validation");
const consoleroute_1 = __importDefault(require("../../middleware/consoleroute"));
const sellerRoutes = express_1.default.Router();
sellerRoutes.get("/store", (0, consoleroute_1.default)("hitting seller/store"), (0, auth_1.default)("seller"), seller_controller_1.sellerController.getStore);
sellerRoutes.get("/store/:id", seller_controller_1.sellerController.getStoreById);
sellerRoutes.get("/overview", (0, consoleroute_1.default)("hitting seller/store"), (0, auth_1.default)("seller"), seller_controller_1.sellerController.getSellerOverview);
sellerRoutes.get("/:id", seller_controller_1.sellerController.getSellerById);
sellerRoutes.post("/createstore", (0, auth_1.default)("seller"), (0, validateRequest_1.default)(seller_validation_1.sellerValidation.storeCreateSchema), seller_controller_1.sellerController.createStore);
sellerRoutes.patch("/updatestore/:id", (0, auth_1.default)("seller"), seller_controller_1.sellerController.updateStoreById);
exports.default = sellerRoutes;
