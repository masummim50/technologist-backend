import { Prisma } from "@prisma/client";
import prisma from "../../shared/prisma";

const createOrder = async (items: any, userId: string) => {
  console.log("create order service: ", items);

  // for (const [key, value] of Object.entries(items)) {

  // }
  for (const [key, value] of Object.entries(items)) {
    let paymentAmount = 50;
    let orders: any = [];
    (value as any).forEach((v: any) => {
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
    const newOrder = await prisma.order.create({
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

const getOrderDetails = async (
  orderId: string,
  role: "customer" | "seller"
) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { Store: true },
  });
  const arrayOfProductId: string[] = [];
  if (
    order?.items &&
    typeof order.items === "object" &&
    Array.isArray(order.items)
  ) {
    const itemsArray = order.items as Prisma.JsonArray;
    itemsArray.forEach((item) => {
      if (typeof item === "object" && item && "productId" in item) {
        arrayOfProductId.push(item.productId as string);
      }
    });
  }

  console.log("product ids: ", arrayOfProductId);

  if (role === "seller") {
    const products = await prisma.product.findMany({
      where: { id: { in: arrayOfProductId } },
      select: { id: true, stock: true },
    });
    console.log("those products: ", products);
    const reformed: any = {};
    products.forEach((product) => {
      reformed[product.id] = product.stock;
    });
    return { order, stock: reformed };
  }
  return order;
};

const getOrdersBySellerId = async (sellerId: string) => {
  const orders = await prisma.order.findMany({
    where: { Store: { sellerId } },
    orderBy: { createdAt: "desc" },
  });
  return orders;
};

const acceptOrderById = async (orderId: string) => {
  const order = await prisma.order.update({
    where: { id: orderId },
    data: { status: "confirmed" },
  });

  console.log("after accepting: ", order);
  (order.items as Prisma.JsonArray).forEach(async (item: any) => {
    await prisma.product.update({
      where: { id: item?.productId },
      data: {
        stock: { decrement: item?.productQuantity },
        sales: { increment: item?.productQuantity },
      },
    });
  });
  return order;
};
const cancleOrderById = async (orderId: string) => {
  const order = await prisma.order.update({
    where: { id: orderId },
    data: { status: "canceled" },
  });
  return order;
};
const shipOrderById = async (orderId: string) => {
  const order = await prisma.order.update({
    where: { id: orderId },
    data: { status: "shipped" },
  });
  return order;
};
const deliverOrderById = async (orderId: string) => {
  const order = await prisma.order.update({
    where: { id: orderId },
    data: { status: "delivered" },
  });
  return order;
};

export const orderService = {
  createOrder,
  getOrderDetails,
  getOrdersBySellerId,
  acceptOrderById,
  cancleOrderById,
  shipOrderById,
  deliverOrderById,
};
