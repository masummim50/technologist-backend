import express from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { productController } from "./product.controller";
import { sellerValidation } from "../seller/seller.validation";

const productRoutes = express.Router();

productRoutes.get("/popular", productController.getPopularProducts);
productRoutes.get("/discounted", productController.getDiscountedProducts);
productRoutes.get("/search", productController.getProductsWithSearchWords);
productRoutes.get("/newest", productController.getNewestProducts);
productRoutes.get("/cart", auth("customer"), productController.getCartItems);
productRoutes.get(
  "/getfromstore/:id",
  productController.getProductsFromStoreForUser
);

productRoutes.get(
  "/category/:categoryname",
  productController.getProductsByCategory
);
productRoutes.get(
  "/forseller/:id",
  productController.getProductDetailsForSeller
);
productRoutes.get("/:id", productController.getProductById);
productRoutes.post(
  "/create",
  auth("seller"),
  //   validateRequest(sellerValidation.storeCreateSchema),
  productController.createProduct
);

productRoutes.post(
  "/addtocart/:id",
  auth("customer"),
  //   validateRequest(sellerValidation.storeCreateSchema),
  productController.addProductToCart
);
productRoutes.post(
  "/cart/increase/:id",
  auth("customer"),
  productController.increaseCart
);
productRoutes.post(
  "/cart/decrease/:id",
  auth("customer"),
  productController.decreaseCart
);
productRoutes.get(
  "/store/:id",
  //   validateRequest(sellerValidation.storeCreateSchema),
  productController.getProductsByStoreId
);
productRoutes.delete(
  "/:id",
  auth("seller"),
  //   validateRequest(sellerValidation.storeCreateSchema),
  productController.deleteProductById
);
productRoutes.patch(
  "/:id",
  auth("seller"),
  //   validateRequest(sellerValidation.storeCreateSchema),
  productController.updateProductById
);

export default productRoutes;
