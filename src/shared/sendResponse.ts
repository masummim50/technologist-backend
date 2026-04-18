import { Response } from "express";

type apiResponseType<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: metaType;
  data?: T | null;
  token?: string | null;
};
type metaType = {
  page: number;
  size: number;
  total: number;
  totalPage?: number;
};

// const sendResponse = <T>(res: Response, data: IApiReponse<T>): void => {
//   const responseData: IApiReponse<T> = {
//     statusCode: data.statusCode,
//     success: data.success,
//     message: data.message || null,
//     meta: data.meta || null || undefined,
//     data: data.data || null || undefined,
//   };

//   res.status(data.statusCode).json(responseData);
// };

const sendResponse = <T>(
  res: Response,
  statusCode: number,
  success: boolean,
  message: string | null,
  data?: T | null,
  meta?: metaType,
  token?: string | null
): void => {
  const responseData: apiResponseType<T> = {
    success: success,
    statusCode: statusCode,
    message: message || null,
    data: data || null || undefined,
    meta: meta || null || undefined,
    token: token,
  };

  res.status(statusCode).json(responseData);
};

export default sendResponse;
