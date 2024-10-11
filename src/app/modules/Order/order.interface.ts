import { Document } from "mongoose";
import { Order_Status, Payment_Status } from "./order.constance";

export interface IOrder extends Document {
  user: {
    name: string;
    email: string;
    phone?: string;
    address?: string;
  };
  totalPrice: number;
  subscriptionDuration: number; // In months
  startDate?: Date;
  endDate?: Date;
  status?: keyof typeof Order_Status; // Strict typing for status
  paymentStatus?: keyof typeof Payment_Status; // Strict typing for payment status
  transactionId?: string;  
}
