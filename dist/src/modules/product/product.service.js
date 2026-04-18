"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productService = void 0;
const prisma_1 = require("../../shared/prisma");
const paginationHelpers_1 = require("../../helpers/paginationHelpers");
const createProduct = async (sellerId, productData) => {
    const store = await prisma_1.prisma.store.findFirst({ where: { sellerId: sellerId } });
    console.log("store found: ", store);
    const result = await prisma_1.prisma.product.create({
        data: { ...productData, store: { connect: { id: store?.id } } },
    });
    console.log("new product created: ", result);
    return result;
};
const getProductsByStoreId = async (storeId, query) => {
    const searchText = query.query || "";
    const page = Number(query.page) || 1;
    const searchWords = searchText.trim().replace(/ /g, " | ");
    const take = 5;
    const skip = (page - 1) * take;
    if (searchWords) {
        const count = await prisma_1.prisma.product.count({
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
        const products = await prisma_1.prisma.product.findMany({
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
    }
    else {
        const count = await prisma_1.prisma.product.count({
            where: {
                storeId,
            },
        });
        const totalPages = Math.ceil(count / take);
        const products = await prisma_1.prisma.product.findMany({
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
const getProductsWithSearchWords = async (searchText, page, skip, take) => {
    console.log("starting search with keywords: ", page);
    const searchWords = searchText.trim().replace(/ /g, " | ");
    const count = await prisma_1.prisma.product.count({
        where: {
            OR: [
                { name: { search: searchWords } },
                { category: { search: searchWords } },
            ],
        },
    });
    const products = await prisma_1.prisma.product.findMany({
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
    const totalPage = (0, paginationHelpers_1.getTotalPage)(count, take);
    const meta = (0, paginationHelpers_1.getMetaData)(page, take, count, totalPage);
    return { products, meta };
};
const getProductById = async (productId) => {
    const product = await prisma_1.prisma.product.findUnique({
        where: { id: productId },
        include: { store: true },
    });
    return product;
};
const deleteProductById = async (productId) => {
    const deleteCartItems = await prisma_1.prisma.cartItem.deleteMany({
        where: { productId: productId },
    });
    const products = await prisma_1.prisma.product.delete({ where: { id: productId } });
    console.log("delete products: ", products);
    return products;
};
const updateProductById = async (productId, sellerId, data) => {
    const update = await prisma_1.prisma.product.update({
        where: { id: productId },
        data,
    });
    return update;
};
const getPopularProducts = async (page, take, skip) => {
    const count = await prisma_1.prisma.product.count({ where: { sales: { gt: 1 } } });
    const products = await prisma_1.prisma.product.findMany({
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
    const totalPage = (0, paginationHelpers_1.getTotalPage)(count, take);
    const meta = (0, paginationHelpers_1.getMetaData)(page, take, count, totalPage);
    return { products, meta };
};
const getNewestProducts = async (page, take, skip) => {
    const date = new Date();
    date.setDate(-10);
    const count = await prisma_1.prisma.product.count();
    const products = await prisma_1.prisma.product.findMany({
        skip,
        take,
        orderBy: {
            createdAt: "desc",
        },
        include: {
            reviews: true,
        },
    });
    const totalPage = (0, paginationHelpers_1.getTotalPage)(count, take);
    const meta = (0, paginationHelpers_1.getMetaData)(page, take, count, totalPage);
    return { products, meta };
};
const getProductsByCategory = async (category, take, skip) => {
    const count = (await prisma_1.prisma.product.findMany({ where: { category: category } })).length;
    // calculate how many pages there will be?
    const totalPages = Math.ceil(count / take);
    const products = await prisma_1.prisma.product.findMany({
        where: { category: category },
        take,
        skip,
    });
    return { products, total: count, totalPages };
};
const addProductToCart = async (userId, productId) => {
    const addedResult = await prisma_1.prisma.cartItem.upsert({
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
const increaseCart = async (cartItemId) => {
    const result = await prisma_1.prisma.cartItem.update({
        where: { id: cartItemId },
        data: { quantity: { increment: 1 } },
    });
    return result;
};
const decreaseCart = async (cartItemId) => {
    const result = await prisma_1.prisma.cartItem.update({
        where: { id: cartItemId },
        data: { quantity: { decrement: 1 } },
    });
    return result;
};
const getCartItems = async (userId) => {
    const products = await prisma_1.prisma.cartItem.findMany({
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
const getProductDetailsForSeller = async (productId) => {
    console.log("new api hitting");
    const product = await prisma_1.prisma.product.findFirst({
        where: { id: productId },
        include: {
            reviews: { include: { user: { select: { name: true } } } },
        },
    });
    return product;
};
const getProductsFromStoreForUser = async (storeId, page, take) => {
    console.log("hitting product service with page: ", page);
    const count = await prisma_1.prisma.product.count({ where: { storeId } });
    const skip = (0, paginationHelpers_1.getSkip)(page, take);
    console.log("skipping: ", skip);
    const products = await prisma_1.prisma.product.findMany({
        where: { storeId },
        skip,
        take,
    });
    const totalPage = (0, paginationHelpers_1.getTotalPage)(count, 10);
    const meta = (0, paginationHelpers_1.getMetaData)(page, 10, count, totalPage);
    return { products, meta };
};
const getDiscountedProducts = async (page, take) => {
    console.log("hitting product service with page: ", page);
    const count = await prisma_1.prisma.product.count({ where: { discount: { gt: 0 } } });
    const skip = (0, paginationHelpers_1.getSkip)(page, take);
    console.log("skipping: ", skip);
    const products = await prisma_1.prisma.product.findMany({
        where: { discount: { gt: 0 } },
        skip,
        take,
    });
    const totalPage = (0, paginationHelpers_1.getTotalPage)(count, 10);
    const meta = (0, paginationHelpers_1.getMetaData)(page, 10, count, totalPage);
    return { products, meta };
};
exports.productService = {
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
