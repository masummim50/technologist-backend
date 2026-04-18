import { connect } from "http2";
import ApiError from "../../shared/apiError";
import excludeField from "../../shared/excludeField";
import prisma from "../../shared/prisma";
import {
  getMetaData,
  getPage,
  getSkip,
  getTotalPage,
} from "../../helpers/paginationHelpers";

const createProduct = async (sellerId: string, productData: any) => {
  const store = await prisma.store.findFirst({ where: { sellerId: sellerId } });
  console.log("store found: ", store);
  const result = await prisma.product.create({
    data: { ...productData, store: { connect: { id: store?.id } } },
  });

  console.log("new product created: ", result);
  return result;
};

const getProductsByStoreId = async (
  storeId: string,
  query: { query: string; page: string }
) => {
  const searchText = query.query || "";
  const page = Number(query.page) || 1;
  const searchWords = searchText.trim().replace(/ /g, " | ");

  const take = 5;
  const skip = (page - 1) * take;

  if (searchWords) {
    const count = await prisma.product.count({
      where: {
        storeId,
        AND: [
          {
            OR: [
              { name: { search: searchWords } },
              { category: { search: searchWords } },
            ],
          },
        ],
      },
    });
    const products = await prisma.product.findMany({
      where: {
        storeId,
        AND: [
          {
            OR: [
              { name: { search: searchWords } },
              { category: { search: searchWords } },
            ],
          },
        ],
      },
      include: { reviews: { select: { rating: true } } },
      orderBy: { updatedAt: "desc" },
      take,
      skip,
    });

    const totalPages = Math.ceil(count / take);

    return { products, total: count, totalPages, skip, take };
  } else {
    const count = await prisma.product.count({
      where: {
        storeId,
      },
    });

    const totalPages = Math.ceil(count / take);
    const products = await prisma.product.findMany({
      where: {
        storeId,
      },
      include: { reviews: { select: { rating: true } } },
      orderBy: { updatedAt: "desc" },
      take,
      skip,
    });
    return { products, total: count, totalPages, skip, take };
  }
};

const getProductsWithSearchWords = async (
  searchText: string,
  page: number,
  skip: number,
  take: number
) => {
  console.log("starting search with keywords: ", page);
  const searchWords = searchText.trim().replace(/ /g, " | ");

  const count = await prisma.product.count({
    where: {
      OR: [
        { name: { search: searchWords } },
        { category: { search: searchWords } },
      ],
    },
  });
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { search: searchWords } },
        { category: { search: searchWords } },
      ],
    },
    include: { reviews: { select: { rating: true } } },
    orderBy: { updatedAt: "desc" },
    skip,
    take,
  });

  const totalPage = getTotalPage(count, take);
  const meta = getMetaData(page, take, count, totalPage);

  return { products, meta };
};

const getProductById = async (productId: string) => {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { store: true },
  });
  return product;
};

const deleteProductById = async (productId: string) => {
  const deleteCartItems = await prisma.cartItem.deleteMany({
    where: { productId: productId },
  });
  const products = await prisma.product.delete({ where: { id: productId } });
  console.log("delete products: ", products);
  return products;
};
const updateProductById = async (
  productId: string,
  sellerId: string,
  data: any
) => {
  const update = await prisma.product.update({
    where: { id: productId },
    data,
  });
  return update;
};

const getPopularProducts = async (page: number, take: number, skip: number) => {
  const count = await prisma.product.count({ where: { sales: { gt: 1 } } });
  const products = await prisma.product.findMany({
    where: { sales: { gt: 1 } },
    take: take,
    skip: skip,
    orderBy: {
      sales: "desc",
    },
    include: {
      reviews: true,
    },
  });
  const totalPage = getTotalPage(count, take);
  const meta = getMetaData(page, take, count, totalPage);
  return { products, meta };
};

const getNewestProducts = async (page: number, take: number, skip: number) => {
  const date = new Date();
  date.setDate(-10);
  const count = await prisma.product.count();
  const products = await prisma.product.findMany({
    skip,
    take,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      reviews: true,
    },
  });
  const totalPage = getTotalPage(count, take);
  const meta = getMetaData(page, take, count, totalPage);

  return { products, meta };
};

const getProductsByCategory = async (
  category: string,
  take: number,
  skip: number
) => {
  const count = (
    await prisma.product.findMany({ where: { category: category } })
  ).length;
  // calculate how many pages there will be?
  const totalPages = Math.ceil(count / take);
  const products = await prisma.product.findMany({
    where: { category: category },
    take,
    skip,
  });
  return { products, total: count, totalPages };
};

const addProductToCart = async (userId: string, productId: string) => {
  const addedResult = await prisma.cartItem.upsert({
    where: {
      userId_productId: {
        userId: userId,
        productId: productId,
      },
    },
    update: {
      quantity: { increment: 1 },
    },
    create: {
      userId: userId,
      productId: productId,
      quantity: 1,
    },
  });
  return addedResult;
};

const increaseCart = async (cartItemId: string) => {
  const result = await prisma.cartItem.update({
    where: { id: cartItemId },
    data: { quantity: { increment: 1 } },
  });
  return result;
};

const decreaseCart = async (cartItemId: string) => {
  const result = await prisma.cartItem.update({
    where: { id: cartItemId },
    data: { quantity: { decrement: 1 } },
  });
  return result;
};

const getCartItems = async (userId: string) => {
  const products = await prisma.cartItem.findMany({
    where: { userId: userId },
    include: {
      product: {
        include: { store: true },
      },
    },
    orderBy: { updatedAt: "desc" },
  });
  return products;
};

const getProductDetailsForSeller = async (productId: string) => {
  console.log("new api hitting");
  const product = await prisma.product.findFirst({
    where: { id: productId },
    include: {
      reviews: { include: { user: { select: { name: true } } } },
    },
  });
  return product;
};

const getProductsFromStoreForUser = async (
  storeId: string,
  page: number,
  take: number
) => {
  console.log("hitting product service with page: ", page);
  const count = await prisma.product.count({ where: { storeId } });

  const skip = getSkip(page, take);
  console.log("skipping: ", skip);
  const products = await prisma.product.findMany({
    where: { storeId },
    skip,
    take,
  });
  const totalPage = getTotalPage(count, 10);
  const meta = getMetaData(page, 10, count, totalPage);
  return { products, meta };
};

const getDiscountedProducts = async (page: number, take: number) => {
  console.log("hitting product service with page: ", page);
  const count = await prisma.product.count({ where: { discount: { gt: 0 } } });

  const skip = getSkip(page, take);
  console.log("skipping: ", skip);
  const products = await prisma.product.findMany({
    where: { discount: { gt: 0 } },
    skip,
    take,
  });
  const totalPage = getTotalPage(count, 10);
  const meta = getMetaData(page, 10, count, totalPage);
  return { products, meta };
};

export const productService = {
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
