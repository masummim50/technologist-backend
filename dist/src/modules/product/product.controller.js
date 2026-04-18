"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const product_service_1 = require("./product.service");
const paginationHelpers_1 = require("../../helpers/paginationHelpers");
const createProduct = (0, catchAsync_1.default)(async (req, res) => {
    const sellerId = req.user.id;
    const productData = req.body;
    console.log("create product controller, req.body: ", productData);
    // sendResponse(res, 200, true, "checking state");
    const store = await product_service_1.productService.createProduct(sellerId, productData);
    (0, sendResponse_1.default)(res, 200, true, "product created successfully", store);
});
const getProductsByStoreId = (0, catchAsync_1.default)(async (req, res) => {
    const storeId = req.params.id;
    const query = req.query;
    const { products, take, total, totalPages } = await product_service_1.productService.getProductsByStoreId(storeId, query);
    (0, sendResponse_1.default)(res, 200, true, "products retrieved successfully", products, {
        page: Number(req.query.page),
        size: take,
        total: total,
        totalPage: totalPages,
    });
});
const deleteProductById = (0, catchAsync_1.default)(async (req, res) => {
    const productId = req.params.id;
    const products = await product_service_1.productService.deleteProductById(productId);
    (0, sendResponse_1.default)(res, 200, true, "product deleted successfully", products);
});
const updateProductById = (0, catchAsync_1.default)(async (req, res) => {
    const productId = req.params.id;
    const data = req.body;
    const seller = req.user.id;
    const products = await product_service_1.productService.updateProductById(productId, seller, data);
    (0, sendResponse_1.default)(res, 200, true, "product updated successfully", products);
});
const getPopularProducts = (0, catchAsync_1.default)(async (req, res) => {
    const page = (0, paginationHelpers_1.getPage)(req.query);
    const limit = 10;
    const skip = (0, paginationHelpers_1.getSkip)(page, limit);
    const { products, meta } = await product_service_1.productService.getPopularProducts(page, limit, skip);
    (0, sendResponse_1.default)(res, 200, true, "popular products retrieved successfully", products, meta);
});
const getNewestProducts = (0, catchAsync_1.default)(async (req, res) => {
    const page = (0, paginationHelpers_1.getPage)(req.query);
    const take = 10;
    const skip = (0, paginationHelpers_1.getSkip)(page, take);
    const { products, meta } = await product_service_1.productService.getNewestProducts(page, take, skip);
    (0, sendResponse_1.default)(res, 200, true, "new products retrieved successfully", products, meta);
});
const getProductById = (0, catchAsync_1.default)(async (req, res) => {
    const productId = req.params.id;
    const products = await product_service_1.productService.getProductById(productId);
    (0, sendResponse_1.default)(res, 200, true, "product details retrieved successfully", products);
});
const getProductsByCategory = (0, catchAsync_1.default)(async (req, res) => {
    console.log("params: ", req.params, " query?: ", req.query);
    const category = req.params.categoryname;
    const page = Number(req.query.page) || 1;
    const take = 5;
    const skip = (page - 1) * take;
    const { products, total, totalPages } = await product_service_1.productService.getProductsByCategory(category, take, skip);
    (0, sendResponse_1.default)(res, 200, true, "related products retrieved successfully", products, {
        page: Number(req.query.page),
        size: take,
        total: total,
        totalPage: totalPages,
    });
});
const addProductToCart = (0, catchAsync_1.default)(async (req, res) => {
    const productId = req.params.id;
    const userId = req.user.id;
    const products = await product_service_1.productService.addProductToCart(userId, productId);
    (0, sendResponse_1.default)(res, 200, true, "Product added to cart successfully", products);
});
const getCartItems = (0, catchAsync_1.default)(async (req, res) => {
    const userId = req.user.id;
    const products = await product_service_1.productService.getCartItems(userId);
    (0, sendResponse_1.default)(res, 200, true, "cart retrieved successfully", products);
});
const increaseCart = (0, catchAsync_1.default)(async (req, res) => {
    const cartItemId = req.params.id;
    const products = await product_service_1.productService.increaseCart(cartItemId);
    (0, sendResponse_1.default)(res, 200, true, "cart increased successfully", products);
});
const decreaseCart = (0, catchAsync_1.default)(async (req, res) => {
    const cartItemId = req.params.id;
    const products = await product_service_1.productService.decreaseCart(cartItemId);
    (0, sendResponse_1.default)(res, 200, true, "cart decreased successfully", products);
});
const getProductDetailsForSeller = (0, catchAsync_1.default)(async (req, res) => {
    const productId = req.params.id;
    const product = await product_service_1.productService.getProductDetailsForSeller(productId);
    (0, sendResponse_1.default)(res, 200, true, "product details retrieved successfully", product);
});
const getProductsWithSearchWords = (0, catchAsync_1.default)(async (req, res) => {
    const query = req.query?.query || "";
    const page = (0, paginationHelpers_1.getPage)(req.query);
    console.log("calculated page: ", page);
    const skip = 5;
    const take = 5;
    const { products, meta } = await product_service_1.productService.getProductsWithSearchWords(query, page, skip, take);
    (0, sendResponse_1.default)(res, 200, true, "products retrieved successfully", products, meta);
});
const getProductsFromStoreForUser = (0, catchAsync_1.default)(async (req, res) => {
    const storeId = req.params.id;
    const page = (0, paginationHelpers_1.getPage)(req.query);
    const take = 10;
    const { products, meta } = await product_service_1.productService.getProductsFromStoreForUser(storeId, page, take);
    (0, sendResponse_1.default)(res, 200, true, "products retrieved successfully", products, meta);
});
const getDiscountedProducts = (0, catchAsync_1.default)(async (req, res) => {
    const page = (0, paginationHelpers_1.getPage)(req.query);
    const take = 10;
    const { products, meta } = await product_service_1.productService.getDiscountedProducts(page, take);
    (0, sendResponse_1.default)(res, 200, true, "discounted products retrieved successfully", products, meta);
});
exports.productController = {
    createProduct,
    getProductsByStoreId,
    deleteProductById,
    getPopularProducts,
    getProductById,
    getProductsByCategory,
    addProductToCart,
    getCartItems,
    increaseCart,
    decreaseCart,
    getNewestProducts,
    updateProductById,
    getProductDetailsForSeller,
    getProductsWithSearchWords,
    getProductsFromStoreForUser,
    getDiscountedProducts,
};
