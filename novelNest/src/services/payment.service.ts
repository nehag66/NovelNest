import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
	providedIn: 'root',
})
export class PaymentService {
	constructor(private _apiService: ApiService) {}

	makePayment(userId: string, amount: number) {
		return this._apiService.post<any>('payment/pay', {
			userId,
			amount,
		});
	}
}
