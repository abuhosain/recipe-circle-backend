import { model, Schema } from "mongoose";
import { IOrder } from "./order.interface";
import { Order_Status, Payment_Status } from "./order.constance";

const OrderSchema = new Schema<IOrder>({
  user: {
    name: { type: String,  },
    email: { type: String,  },
    phone: { type: String,  },
    address: { type: String,  },
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  subscriptionDuration: {
    type: Number,
    required: true, // Number of months for subscription
  },
  startDate: {
    type: Date,
    default: Date.now, // Defaults to current date
  },
  endDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: Object.values(Order_Status), // Use constant values
    default: Order_Status.pending, // Set default value
  },
  paymentStatus: {
    type: String,
    enum: Object.values(Payment_Status), // Use constant values
    default: Payment_Status.pending, // Default to pending
  },
  transactionId: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

export const Order = model<IOrder>("Order", OrderSchema);
