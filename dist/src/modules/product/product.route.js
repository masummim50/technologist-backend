"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const product_controller_1 = require("./product.controller");
const productRoutes = express_1.default.Router();
productRoutes.get("/popular", product_controller_1.productController.getPopularProducts);
productRoutes.get("/discounted", product_controller_1.productController.getDiscountedProducts);
productRoutes.get("/search", product_controller_1.productController.getProductsWithSearchWords);
productRoutes.get("/newest", product_controller_1.productController.getNewestProducts);
productRoutes.get("/cart", (0, auth_1.default)("customer"), product_controller_1.productController.getCartItems);
productRoutes.get("/getfromstore/:id", product_controller_1.productController.getProductsFromStoreForUser);
productRoutes.get("/category/:categoryname", product_controller_1.productController.getProductsByCategory);
productRoutes.get("/forseller/:id", product_controller_1.productController.getProductDetailsForSeller);
productRoutes.get("/:id", product_controller_1.productController.getProductById);
productRoutes.post("/create", (0, auth_1.default)("seller"), 
//   validateRequest(sellerValidation.storeCreateSchema),
product_controller_1.productController.createProduct);
productRoutes.post("/addtocart/:id", (0, auth_1.default)("customer"), 
//   validateRequest(sellerValidation.storeCreateSchema),
product_controller_1.productController.addProductToCart);
productRoutes.post("/cart/increase/:id", (0, auth_1.default)("customer"), product_controller_1.productController.increaseCart);
productRoutes.post("/cart/decrease/:id", (0, auth_1.default)("customer"), product_controller_1.productController.decreaseCart);
productRoutes.get("/store/:id", 
//   validateRequest(sellerValidation.storeCreateSchema),
product_controller_1.productController.getProductsByStoreId);
productRoutes.delete("/:id", (0, auth_1.default)("seller"), 
//   validateRequest(sellerValidation.storeCreateSchema),
product_controller_1.productController.deleteProductById);
productRoutes.patch("/:id", (0, auth_1.default)("seller"), 
//   validateRequest(sellerValidation.storeCreateSchema),
product_controller_1.productController.updateProductById);
exports.default = productRoutes;
