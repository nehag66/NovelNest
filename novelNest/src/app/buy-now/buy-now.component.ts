import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CLIENT_ROUTES } from 'app/app.routes';
import { MaterialModule } from 'app/material.module';
import { Novel } from 'app/models/novel';
import { OrderResponse } from 'app/models/order';
import { ApiService } from 'services/api.service';
import { CartService } from 'services/cart.service';
import { OrderService } from 'services/order.service';
import { PaymentService } from 'services/payment.service';
import { StorageService } from 'services/storage.service';
import { CONSTANTS } from 'shared/constants';
@Component({
	selector: 'app-buy-now',
	standalone: true,
	imports: [CommonModule, MaterialModule],
	templateUrl: './buy-now.component.html',
	styleUrl: './buy-now.component.scss',
})
export class BuyNowComponent implements OnInit {
	isLoading = false;
	novelDetails!: Novel;
	selectedNovels: any[] = [];
	userDetails: any;

	orderTotal = 0;
	userId: any;
	paymentResponse: any;

	paymentMethods = [
		{
			cardName: 'Amazon Pay ICICI Bank Credit Card',
			lastFour: '3624',
			nickname: 'Neha Goel',
			default: true,
			cvvNote: true,
		},
		{
			cardName: 'Axis Bank Credit Card',
			lastFour: '3555',
			nickname: 'Neha Goel',
			default: false,
		},
		{
			cardName: 'SBI Credit Card',
			lastFour: '7477',
			nickname: 'Neha Goel',
			default: false,
			disabled: true,
		},
	];

	paymentIcons = [
		{ src: 'visa.png', alt: 'Visa' },
		{ src: 'mastercard.jpeg', alt: 'Mastercard' },
		{ src: 'upi.png', alt: 'Upi' },
		{ src: 'rupay.png', alt: 'Rupay' },
		{ src: 'paytm.jpg', alt: 'Paytm' },
	];

	selectedPaymentMethod = this.paymentMethods.find((p) => p.default);

	constructor(
		private _router: Router,
		private _storageService: StorageService,
		private _apiService: ApiService,
		private _paymentService: PaymentService,
		private _cartService: CartService,
		private _orderService: OrderService,
	) {
		const navigation = this._router.getCurrentNavigation();
		this.selectedNovels = (
			navigation?.extras.state?.['selectedNovels'] || []
		).map((item: any) => ({
			...item,
			novelId: {
				...item.novelId,
				images:
					item.novelId?.images?.map((img: string) => {
						return img.startsWith('http')
							? img
							: `${CONSTANTS.IMAGE_URL}${img}`;
					}) || [],
			},
		}));
	}

	ngOnInit(): void {
		this.orderTotal = this.selectedNovels.reduce(
			(acc, curr) => acc + curr.novelId.price * curr.quantity,
			0,
		);
		this.fetchUserDetails();
	}

	confirmPayment() {
		alert(
			`Payment method selected: ${this.selectedPaymentMethod?.cardName}`,
		);
	}

	fetchUserDetails() {
		this.userId = this._storageService.get<any[]>('userId') || [];
		this._apiService
			.get<{
				message: string;
				user: any;
			}>(`users/${this.userId}`)
			.subscribe((res) => {
				this.userDetails = res.user;
			});
	}

	placeOrder() {
		this.isLoading = true;
		this._paymentService
			.makePayment(this.userId, this.orderTotal)
			.subscribe({
				next: (res) => {
					const novelIds = this.selectedNovels.map((item: any) => ({
						novelId: item.novelId._id,
						quantity: item.quantity,
						price: item.novelId.price,
					}));

					this._orderService
						.createOrder({
							items: novelIds,
							totalAmount: this.orderTotal,
							paymentId: res.paymentId,
						})
						.subscribe((res: OrderResponse) => {
							this.isLoading = false;

							const novelIds = this.selectedNovels.map(
								(item: any) => item.novelId._id,
							);

							this._cartService
								.removeMultipleItemsFromCart(novelIds)
								.subscribe(() => {
									this._cartService.fetchCart();
									this.goToOrderPlacedPage();
								});
						});
				},
			});
	}

	goToOrderPlacedPage() {
		this._router.navigate([CLIENT_ROUTES.ORDER_PLACED], {
			replaceUrl: true,
		});
	}
}
