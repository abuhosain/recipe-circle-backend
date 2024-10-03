import catchAsync from "../../utils/catchAsynch";
import { orderService } from "./order.service";

  const createOrder = catchAsync(async (req, res) => {
    const user = req.user;
    const payload = req.body;
    const order = await orderService.createOrder(user, payload)
 });

 export const OrderControllers = {
   createOrder
 }