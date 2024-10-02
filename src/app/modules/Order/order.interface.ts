
export interface IOrder extends Document {
    user: {
        name: string;
        email: string;
        phone: string;
        address: string;
    };
    totalPrice: number; // The total price for the premium subscription
    subscriptionDuration: number; // The number of months for the premium subscription
    startDate?: Date;  
    endDate?: Date;  
    isPremium: boolean;  
    status?: 'pending' | 'completed' | 'cancelled'; // Order status
    paymentStatus?: 'paid' | 'unpaid'; // Payment status
    transactionId?: string; // Unique transaction identifier
}
