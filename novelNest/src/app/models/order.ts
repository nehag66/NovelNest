import { Novel } from './novel';

export interface OrderItem {
	novelId: Novel;
	quantity: number;
	price: number;
	_id: string;
}

export interface Order {
	_id: string;
	userId: string;
	items: OrderItem[];
	totalAmount: number;
	status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
	paymentId?: string;
	createdAt: string; // ISO date string
	__v?: number;
}

export interface OrderResponse {
	message: string;
	order: Order;
}

export interface OrdersResponse {
	message: string;
	orders: Order[];
}
