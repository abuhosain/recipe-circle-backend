import { Response } from 'express';
import httpStatus from 'http-status';
type Tresponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  token?: string;
  data: T;
};
const sendResponse = <T>(res: Response, data: Tresponse<T>) => {
  res.status(data?.statusCode).json({
    statusCode: httpStatus.OK,
    success: data.success,
    token: data?.token,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;
