import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { CardDetails } from '../../main-page/sell-old-books/sell-old-books.component';
import { CommonModule } from '@angular/common';

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
		cardDesc:
			'card desc',
		cardNumber: 1,
		imgSrc: 'dummy',
		altName: 'altName',
		bgColor: 'white',
	};
}
