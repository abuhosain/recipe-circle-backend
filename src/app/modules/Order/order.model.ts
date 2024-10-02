import { model, Schema } from "mongoose";
import { IOrder } from "./order.interface";

const OrderSchema = new Schema<IOrder>({
    user: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
    },
    totalPrice: {
        type: Number,
        required: true
    },
    subscriptionDuration: {
        type: Number,
        required: true, // This indicates the number of months for the premium subscription
    },
    startDate: {
        type: Date, // When the subscription starts
        default: Date.now, // Default to current date/time
    },
    endDate: {
        type: Date, // When the subscription ends
    },
    isPremium: {
        type: Boolean, // Whether this order grants premium access
        default: false, // Default to non-premium, unless specified
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],  
        default: 'pending'
    },
    transactionId: {
        type: String,
        required: true
    },

}, {
    timestamps: true  
});

export const Order = model<IOrder>("Order", OrderSchema);
