import ApiError from "../../shared/apiError";
import excludeField from "../../shared/excludeField";
import prisma from "../../shared/prisma";
import { userType } from "./user.interface";

const getUserById = async (userId: string): Promise<Partial<userType>> => {
  console.log("userservice");
  const result = await prisma.user.findUnique({ where: { id: userId } });
  console.log("result: ", result);
  if (result) {
    console.log("result: ", result);
    const user = excludeField(result, ["password"]);
    return user;
  } else {
    throw new ApiError(400, "user not found");
  }
};

const getOrdersByUserId = async (userId: string) => {
  const orders = await prisma.order.findMany({
    where: { userId },
    orderBy: {
      updatedAt: "desc",
    },
  });
  return orders;
};

const followStore = async (storeId: string, userId: string) => {
  const update = await prisma.store.update({
    where: { id: storeId },
    data: { followers: { connect: { id: userId } } },
  });

  return update;
};
const unFollowStore = async (storeId: string, userId: string) => {
  const update = await prisma.store.update({
    where: { id: storeId },
    data: { followers: { disconnect: { id: userId } } },
  });

  return update;
};

export const userService = {
  getUserById,
  getOrdersByUserId,
  followStore,
  unFollowStore,
};
