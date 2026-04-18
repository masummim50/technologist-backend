"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sellerController = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const seller_service_1 = require("./seller.service");
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const getSellerById = (0, catchAsync_1.default)(async (req, res) => {
    const sellerId = req.params.id;
    const seller = await seller_service_1.sellerService.getSellerById(sellerId);
    (0, sendResponse_1.default)(res, 200, true, "Seller retrieved successfully", seller);
});
const createStore = (0, catchAsync_1.default)(async (req, res) => {
    const sellerId = req.user.id;
    const storeData = req.body;
    const store = await seller_service_1.sellerService.createStore(sellerId, {
        ...storeData,
        seller: sellerId,
    });
    (0, sendResponse_1.default)(res, 200, true, "Store created successfully", store);
});
const getStore = (0, catchAsync_1.default)(async (req, res) => {
    const sellerId = req.user.id;
    const store = await seller_service_1.sellerService.getStore(sellerId);
    (0, sendResponse_1.default)(res, 200, true, "Store retrieved successfully", store);
});
const getSellerOverview = (0, catchAsync_1.default)(async (req, res) => {
    const sellerId = req.user.id;
    const overview = await seller_service_1.sellerService.getSellerOverview(sellerId);
    (0, sendResponse_1.default)(res, 200, true, "seller overview retrieved successfully", overview);
});
const updateStoreById = (0, catchAsync_1.default)(async (req, res) => {
    const sellerId = req.user.id;
    const storeId = req.params.id;
    const data = req.body;
    const overview = await seller_service_1.sellerService.updateStoreById(storeId, sellerId, data);
    (0, sendResponse_1.default)(res, 200, true, "Store info updated successfully", overview);
});
const getStoreById = (0, catchAsync_1.default)(async (req, res) => {
    const storeId = req.params.id;
    const store = await seller_service_1.sellerService.getStoreById(storeId);
    (0, sendResponse_1.default)(res, 200, true, "Store info retrieved successfully", store);
});
exports.sellerController = {
    getSellerById,
    createStore,
    getStore,
    getSellerOverview,
    updateStoreById,
    getStoreById,
};
