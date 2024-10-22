import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'app/material.module';
import { CardDetails } from 'app/main-page/sell-old-books/sell-old-books.component';

@Component({
	selector: 'app-card-layout',
	standalone: true,
	imports: [MaterialModule, CommonModule],
	templateUrl: './card-layout.component.html',
	styleUrl: './card-layout.component.scss',
})
export class CardLayoutComponent {
	@Input() cardDetails: CardDetails = {
		cardTitle: 'card title',
		cardDesc: 'card desc',
		cardNumber: 1,
		imgSrc: 'dummy',
		altName: 'altName',
		bgColor: 'white',
	};
}
