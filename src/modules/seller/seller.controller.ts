import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { sellerService } from "./seller.service";
import sendResponse from "../../shared/sendResponse";

const getSellerById = catchAsync(async (req: Request, res: Response) => {
  const sellerId = req.params.id;
  const seller = await sellerService.getSellerById(sellerId);
  sendResponse(res, 200, true, "Seller retrieved successfully", seller);
});
const createStore = catchAsync(async (req: Request, res: Response) => {
  const sellerId = (req as any).user.id;
  const storeData = req.body;
  const store = await sellerService.createStore(sellerId, {
    ...storeData,
    seller: sellerId,
  });
  sendResponse(res, 200, true, "Store created successfully", store);
});
const getStore = catchAsync(async (req: Request, res: Response) => {
  const sellerId = (req as any).user.id;
  const store = await sellerService.getStore(sellerId);

  sendResponse(res, 200, true, "Store retrieved successfully", store);
});

const getSellerOverview = catchAsync(async (req: Request, res: Response) => {
  const sellerId = (req as any).user.id;
  const overview = await sellerService.getSellerOverview(sellerId);

  sendResponse(
    res,
    200,
    true,
    "seller overview retrieved successfully",
    overview
  );
});

const updateStoreById = catchAsync(async (req: Request, res: Response) => {
  const sellerId = (req as any).user.id;
  const storeId = req.params.id;
  const data = req.body;
  const overview = await sellerService.updateStoreById(storeId, sellerId, data);

  sendResponse(res, 200, true, "Store info updated successfully", overview);
});

const getStoreById = catchAsync(async (req: Request, res: Response) => {
  const storeId = req.params.id;
  const store = await sellerService.getStoreById(storeId);

  sendResponse(res, 200, true, "Store info retrieved successfully", store);
});

export const sellerController = {
  getSellerById,
  createStore,
  getStore,
  getSellerOverview,
  updateStoreById,
  getStoreById,
};
