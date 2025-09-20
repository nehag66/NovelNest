import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { OrderResponse, OrdersResponse } from 'app/models/order';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class OrderService {
	constructor(private _apiService: ApiService) {}

	createOrder(orderData: {
		items: any[];
		totalAmount: number;
		paymentId?: string;
	}): Observable<OrderResponse> {
		return this._apiService.post<OrderResponse>('orders', orderData);
	}

	getUserOrders(): Observable<OrdersResponse> {
		return this._apiService.get<OrdersResponse>('orders');
	}
}
