import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from 'app/material.module';
import { Novel } from 'app/models/novels';
@Component({
	selector: 'app-buy-now',
	standalone: true,
	imports: [CommonModule, MaterialModule],
	templateUrl: './buy-now.component.html',
	styleUrl: './buy-now.component.scss',
})
export class BuyNowComponent implements OnInit {
	novelDetails!: Novel;
	selectedNovels: any[] = [];

	orderTotal = 0;

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

	constructor(private _router: Router) {
		const navigation = this._router.getCurrentNavigation();
		this.selectedNovels =
			navigation?.extras.state?.['selectedNovels'] || [];
	}

	ngOnInit(): void {
		this.orderTotal = this.selectedNovels.reduce((acc, curr) => acc+=curr.novelId.price, 0);
	}

	confirmPayment() {
		alert(
			`Payment method selected: ${this.selectedPaymentMethod?.cardName}`,
		);
	}

	placeOrder() {}
}
