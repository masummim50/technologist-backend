import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { productService } from "./product.service";
import { getPage, getSkip } from "../../helpers/paginationHelpers";

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const sellerId = (req as any).user.id;
  const productData = req.body;
  console.log("create product controller, req.body: ", productData);
  // sendResponse(res, 200, true, "checking state");
  const store = await productService.createProduct(sellerId, productData);
  sendResponse(res, 200, true, "product created successfully", store);
});

const getProductsByStoreId = catchAsync(async (req: Request, res: Response) => {
  const storeId = req.params.id;
  const query = req.query;

  const { products, take, total, totalPages } =
    await productService.getProductsByStoreId(
      storeId,
      query as { query: string; page: string }
    );
  sendResponse(res, 200, true, "products retrieved successfully", products, {
    page: Number(req.query.page),
    size: take,
    total: total,
    totalPage: totalPages,
  });
});

const deleteProductById = catchAsync(async (req: Request, res: Response) => {
  const productId = req.params.id;

  const products = await productService.deleteProductById(productId);
  sendResponse(res, 200, true, "product deleted successfully", products);
});

const updateProductById = catchAsync(async (req: Request, res: Response) => {
  const productId = req.params.id;
  const data = req.body;
  const seller = (req as any).user.id;

  const products = await productService.updateProductById(
    productId,
    seller,
    data
  );
  sendResponse(res, 200, true, "product updated successfully", products);
});

const getPopularProducts = catchAsync(async (req: Request, res: Response) => {
  const page = getPage(req.query);
  const limit = 10;
  const skip = getSkip(page, limit);

  const { products, meta } = await productService.getPopularProducts(
    page,
    limit,
    skip
  );
  sendResponse(
    res,
    200,
    true,
    "popular products retrieved successfully",
    products,
    meta
  );
});
const getNewestProducts = catchAsync(async (req: Request, res: Response) => {
  const page = getPage(req.query);
  const take = 10;
  const skip = getSkip(page, take);
  const { products, meta } = await productService.getNewestProducts(
    page,
    take,
    skip
  );
  sendResponse(
    res,
    200,
    true,
    "new products retrieved successfully",
    products,
    meta
  );
});

const getProductById = catchAsync(async (req: Request, res: Response) => {
  const productId = req.params.id;
  const products = await productService.getProductById(productId);
  sendResponse(
    res,
    200,
    true,
    "product details retrieved successfully",
    products
  );
});
const getProductsByCategory = catchAsync(
  async (req: Request, res: Response) => {
    console.log("params: ", req.params, " query?: ", req.query);
    const category = req.params.categoryname;

    const page = Number(req.query.page as string) || 1;

    const take = 5;
    const skip = (page - 1) * take;

    const { products, total, totalPages } =
      await productService.getProductsByCategory(category, take, skip);
    sendResponse(
      res,
      200,
      true,
      "related products retrieved successfully",
      products,
      {
        page: Number(req.query.page),
        size: take,
        total: total,
        totalPage: totalPages,
      }
    );
  }
);

const addProductToCart = catchAsync(async (req: Request, res: Response) => {
  const productId = req.params.id;
  const userId = (req as any).user.id;
  const products = await productService.addProductToCart(userId, productId);
  sendResponse(res, 200, true, "Product added to cart successfully", products);
});

const getCartItems = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const products = await productService.getCartItems(userId);
  sendResponse(res, 200, true, "cart retrieved successfully", products);
});
const increaseCart = catchAsync(async (req: Request, res: Response) => {
  const cartItemId = req.params.id;
  const products = await productService.increaseCart(cartItemId);
  sendResponse(res, 200, true, "cart increased successfully", products);
});
const decreaseCart = catchAsync(async (req: Request, res: Response) => {
  const cartItemId = req.params.id;
  const products = await productService.decreaseCart(cartItemId);
  sendResponse(res, 200, true, "cart decreased successfully", products);
});

const getProductDetailsForSeller = catchAsync(
  async (req: Request, res: Response) => {
    const productId = req.params.id;
    const product = await productService.getProductDetailsForSeller(productId);
    sendResponse(
      res,
      200,
      true,
      "product details retrieved successfully",
      product
    );
  }
);

const getProductsWithSearchWords = catchAsync(
  async (req: Request, res: Response) => {
    const query = req.query?.query || "";
    const page = getPage(req.query);
    console.log("calculated page: ", page);
    const skip = 5;
    const take = 5;
    const { products, meta } = await productService.getProductsWithSearchWords(
      query as string,
      page,
      skip,
      take
    );
    sendResponse(
      res,
      200,
      true,
      "products retrieved successfully",
      products,
      meta
    );
  }
);

const getProductsFromStoreForUser = catchAsync(
  async (req: Request, res: Response) => {
    const storeId = req.params.id;
    const page = getPage(req.query);
    const take = 10;
    const { products, meta } = await productService.getProductsFromStoreForUser(
      storeId,
      page,
      take
    );
    sendResponse(
      res,
      200,
      true,
      "products retrieved successfully",
      products,
      meta
    );
  }
);

const getDiscountedProducts = catchAsync(
  async (req: Request, res: Response) => {
    const page = getPage(req.query);
    const take = 10;
    const { products, meta } = await productService.getDiscountedProducts(
      page,
      take
    );
    sendResponse(
      res,
      200,
      true,
      "discounted products retrieved successfully",
      products,
      meta
    );
  }
);

export const productController = {
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
