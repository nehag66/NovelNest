import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardLayoutComponent } from 'app/card-layout/card-layout.component';
import { CardDetails } from 'app/models/card';

@Component({
    selector: 'app-second-hand-books',
    standalone: true,
    templateUrl: './second-hand-books.component.html',
    styleUrl: './second-hand-books.component.scss',
    imports: [CardLayoutComponent, CommonModule]
})
export class SecondHandBooksComponent {

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
