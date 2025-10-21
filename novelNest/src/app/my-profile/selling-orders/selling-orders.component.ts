import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from 'app/material.module';
import { Order } from 'app/models/order';
import { SellingOrdersResponse } from 'app/models/sellingorders';
import { map } from 'rxjs';
import { ApiService } from 'services/api.service';
import { AuthService } from 'services/auth.service';
import { CONSTANTS } from 'shared/constants';

@Component({
	selector: 'app-selling-orders',
	standalone: true,
	imports: [CommonModule, MaterialModule],
	templateUrl: './selling-orders.component.html',
	styleUrl: './selling-orders.component.scss',
})
export class SellingOrdersComponent implements OnInit {
	isLoggedIn: string | null = null;
	orders: any[] = [];

	constructor(
		private _apiService: ApiService,
		private _authService: AuthService,
	) {
		this.isLoggedIn = this._authService.bearerToken;
	}

	ngOnInit() {
		this.getMyNovels();
	}

	getMyNovels() {
		return this._apiService
			.get<SellingOrdersResponse>('my-novels')
			.pipe(
				map((res) => ({
					...res,
					orders: res.orders.map((order) => ({
						...order,
						images: order.images.map(
							(img: string) => `${CONSTANTS.IMAGE_URL}${img}`,
						),
					})),
				})),
			)
			.subscribe((res: any) => {
				this.orders = res.orders?.sort(
					(a: Order, b: Order) =>
						new Date(b.createdAt).getTime() -
						new Date(a.createdAt).getTime(),
				);
			});
	}
}
