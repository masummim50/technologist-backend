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
const sendResponse = (res, statusCode, success, message, data, meta, token) => {
    const responseData = {
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
