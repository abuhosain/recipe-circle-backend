import { JwtPayload } from 'jsonwebtoken'
import { Order } from './order.model'
import { IOrder } from './order.interface'
import { User } from '../Auth/auth.model'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'
import moment from 'moment'
import { initiatePayment } from '../payment/payment.utils'

const createOrder = async (user: JwtPayload, payload: Partial<IOrder>) => {

   // Find user
   const isUser = await User.findOne({ email: user?.email });
   if (!isUser) {
       throw new AppError(httpStatus.NOT_FOUND, 'User not found');
   }

   // Check if the user already has an active subscription
   const oldOrder = await Order.findOne({
       'user.email': payload?.user?.email, 
       isPremium: true, 
       endDate: { $gte: new Date() }, // Check if endDate is greater than or equal to today
   });

   if (oldOrder) {
       throw new AppError(
           httpStatus.BAD_REQUEST, 
           'You already have an active premium package running'
       );
   }

   // Generate a new transaction ID
   const transactionId = `TXN-${Date.now()}`;

   // Prepare the new order data
   const orderData: Partial<IOrder> = {
       user: payload.user,
       totalPrice: payload.totalPrice,
       subscriptionDuration: payload.subscriptionDuration,
       startDate: payload.startDate || new Date(), // Default to the current date if not provided
       endDate: payload.endDate || moment().add(payload.subscriptionDuration, 'months').toDate(), // Calculate endDate based on subscriptionDuration
       status: payload.status || 'pending',
       transactionId: transactionId
   };

   // Create the new order
   const order = await Order.create(orderData);

  const paymentData = {
    transactionId : transactionId,
    totalPrice: payload?.totalPrice,
    custormerName: isUser.name,
    customerEmail: isUser.email,
    customerPhone: isUser.phone,
    customerAddress: "Bogura, Bangladesh",
    startDate : payload.startDate || new Date(),
    endDate : payload.endDate || moment().add(payload?.subscriptionDuration, 'months').toDate(),
  };

  
  const paymentSeasion = await initiatePayment(paymentData)
  return paymentSeasion

}

export const orderService = {
  createOrder,
}
