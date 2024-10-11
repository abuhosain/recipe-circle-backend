import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsynch";
import sendResponse from "../../utils/sendResponse";
import { orderService } from "./order.service";

  const createOrder = catchAsync(async (req, res) => {
    const user : any = req.user;
    const payload = req.body;
    const order = await orderService.createOrder(user, payload);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order created Successfully',
      data: order
    })
 });

 export const OrderControllers = {
   createOrder
 }