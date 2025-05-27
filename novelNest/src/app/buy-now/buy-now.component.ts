import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CLIENT_ROUTES } from 'app/app.routes';
import { MaterialModule } from 'app/material.module';
import { Novel } from 'app/models/novels';
import { ApiService } from 'services/api.service';
import { CartService } from 'services/cart.service';
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
			lastFour: '3008',
			nickname: 'Neha Goel',
			default: true,
			cvvNote: true,
		},
		{
			cardName: 'Axis Bank Credit Card',
			lastFour: '2589',
			nickname: 'Ashish Kumar',
			default: false,
		},
		{
			cardName: 'SBI Credit Card',
			lastFour: '3151',
			nickname: 'Ashish Kumar',
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
					this.isLoading = false;
					// this.paymentResponse = res;

					this.selectedNovels.forEach((item: any) => {
						this._cartService.removeFromCart(item).subscribe();
					});

					this.goToOrderPlacedPage();
				},
				error: (err) => {
					this.isLoading = false;
					console.error('Payment failed', err);
				},
			});
	}

	goToOrderPlacedPage() {
		this._cartService.fetchCart();
		this._router.navigateByUrl(CLIENT_ROUTES.ORDER_PLACED);
	}
}
