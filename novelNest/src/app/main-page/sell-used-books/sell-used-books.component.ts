import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardDetails } from '../sell-old-books/sell-old-books.component';
import { CardLayoutComponent } from 'app/card-layout/card-layout.component';

@Component({
    selector: 'app-sell-used-books',
    standalone: true,
    templateUrl: './sell-used-books.component.html',
    styleUrl: './sell-used-books.component.scss',
    imports: [CardLayoutComponent, CommonModule]
})
export class SellUsedBooksComponent {

	cardDetails: CardDetails[] = [
		{
			cardTitle: 'Select the used books you want',
			cardDesc: 'Search from over thousands of used books listed on Novel Nest.',
			cardNumber: 1,
			imgSrc: 'buy-books-1.png',
			altName: 'buy-books-1',
			bgColor: '#fff2c7',
		},
		{
			cardTitle: 'Place the order by making payment to Novel Nest',
			cardDesc: 'Then simply place the order by clicking on "Buy Now" button.',
			cardNumber: 2,
			imgSrc: 'buy-books-2.png',
			altName: 'buy-books-2',
			bgColor: '#fff2c7',
		},
		{
			cardTitle: 'Get the books delivered at your doorstep',
			cardDesc: 'The books will be delivered to you at your doorstep!',
			cardNumber: 3,
			imgSrc: 'buy-books-3.png',
			altName: 'buy-books-3',
			bgColor: '#fff2c7',
		},
	];
}
