import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { CardLayoutComponent } from "../../reusable-components/card-layout/card-layout.component";
import { CommonModule } from '@angular/common';

export interface CardDetails {
	cardTitle: string;
	cardDesc: string;
	cardNumber: number;
	imgSrc: string;
	altName: string;
	bgColor?: string;
}

@Component({
    selector: 'app-sell-old-books',
    standalone: true,
    templateUrl: './sell-old-books.component.html',
    styleUrl: './sell-old-books.component.scss',
    imports: [MaterialModule, CardLayoutComponent, CommonModule]
})
export class SellOldBooksComponent {

	cardDetails: CardDetails[] = [
		{
			cardTitle: 'Post an ad for selling used books',
			cardDesc: 'Post an ad on Novel Nest describing your book details to sell your old books online.',
			cardNumber: 1,
			imgSrc: 'post-ad-img.png',
			altName: 'post-ad',
		},
		{
			cardTitle: 'Set the selling price for your books',
			cardDesc: 'Set the price for your books at which you want to sell them.',
			cardNumber: 2,
			imgSrc: 'money-img.png',
			altName: 'money-img',
		},
		{
			cardTitle: 'Get paid into your UPI/Bank account',
			cardDesc: 'You will get money into your account once you receive an order for your book.',
			cardNumber: 3,
			imgSrc: 'pay-money.png',
			altName: 'pay-money',
		},
	];
}
