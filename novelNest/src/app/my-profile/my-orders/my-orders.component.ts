import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CLIENT_ROUTES } from 'app/app.routes';
import { MaterialModule } from 'app/material.module';
import { Order } from 'app/models/order';
import { map } from 'rxjs';
import { AuthService } from 'services/auth.service';
import { OrderService } from 'services/order.service';
import { CONSTANTS } from 'shared/constants';

@Component({
	selector: 'app-my-orders',
	standalone: true,
	imports: [CommonModule, MaterialModule],
	templateUrl: './my-orders.component.html',
	styleUrl: './my-orders.component.scss',
})
export class MyOrdersComponent {
	orders: Order[] = [];
	isLoggedIn: string | null = null;

	constructor(
		private _router: Router,
		private _authService: AuthService,
		private _orderService: OrderService,
	) {
		this.isLoggedIn = this._authService.bearerToken;
		this.getOrders();
	}

	getOrders() {
		this._orderService
			.getUserOrders()
			.pipe(
				map((res) => ({
					...res,
					orders: res.orders.map((order) => ({
						...order,
						items: order.items.map((item) => ({
							...item,
							novelId:
								typeof item.novelId === 'string'
									? { _id: item.novelId }
									: {
											...item.novelId,
											images: item.novelId.images.map(
												(img: any) =>
													`${CONSTANTS.IMAGE_URL}${img}`,
											),
										},
						})),
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

	goToBuyBooks() {
		this._router.navigateByUrl(CLIENT_ROUTES.NOVEL_LIST);
	}
}
