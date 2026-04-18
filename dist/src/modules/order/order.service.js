"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const prisma_1 = require("../../shared/prisma");
const createOrder = async (items, userId) => {
    console.log("create order service: ", items);
    // for (const [key, value] of Object.entries(items)) {
    // }
    for (const [key, value] of Object.entries(items)) {
        let paymentAmount = 50;
        let orders = [];
        value.forEach((v) => {
            paymentAmount = paymentAmount + v.price * v.quantity;
            orders.push({
                productId: v.id,
                productName: v.name,
                productPrice: v.price,
                productQuantity: v.quantity,
                productImages: [...v.images],
                storeId: v.storeId,
            });
        });
        const newOrder = await prisma_1.prisma.order.create({
            data: {
                storeId: key,
                paymentAmount: paymentAmount,
                userId: userId,
                items: orders,
            },
        });
    }
    return true;
};
const getOrderDetails = async (orderId, role) => {
    const order = await prisma_1.prisma.order.findUnique({
        where: { id: orderId },
        include: { Store: true },
    });
    const arrayOfProductId = [];
    if (order?.items &&
        typeof order.items === "object" &&
        Array.isArray(order.items)) {
        const itemsArray = order.items;
        itemsArray.forEach((item) => {
            if (typeof item === "object" && item && "productId" in item) {
                arrayOfProductId.push(item.productId);
            }
        });
    }
    console.log("product ids: ", arrayOfProductId);
    if (role === "seller") {
        const products = await prisma_1.prisma.product.findMany({
            where: { id: { in: arrayOfProductId } },
            select: { id: true, stock: true },
        });
        console.log("those products: ", products);
        const reformed = {};
        products.forEach((product) => {
            reformed[product.id] = product.stock;
        });
        return { order, stock: reformed };
    }
    return order;
};
const getOrdersBySellerId = async (sellerId) => {
    const orders = await prisma_1.prisma.order.findMany({
        where: { Store: { sellerId } },
        orderBy: { createdAt: "desc" },
    });
    return orders;
};
const acceptOrderById = async (orderId) => {
    const order = await prisma_1.prisma.order.update({
        where: { id: orderId },
        data: { status: "confirmed" },
    });
    console.log("after accepting: ", order);
    order.items.forEach(async (item) => {
        await prisma_1.prisma.product.update({
            where: { id: item?.productId },
            data: {
                stock: { decrement: item?.productQuantity },
                sales: { increment: item?.productQuantity },
            },
        });
    });
    return order;
};
const cancleOrderById = async (orderId) => {
    const order = await prisma_1.prisma.order.update({
        where: { id: orderId },
        data: { status: "canceled" },
    });
    return order;
};
const shipOrderById = async (orderId) => {
    const order = await prisma_1.prisma.order.update({
        where: { id: orderId },
        data: { status: "shipped" },
    });
    return order;
};
const deliverOrderById = async (orderId) => {
    const order = await prisma_1.prisma.order.update({
        where: { id: orderId },
        data: { status: "delivered" },
    });
    return order;
};
exports.orderService = {
    createOrder,
    getOrderDetails,
    getOrdersBySellerId,
    acceptOrderById,
    cancleOrderById,
    shipOrderById,
    deliverOrderById,
};
