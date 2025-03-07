import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardLayoutComponent } from 'app/card-layout/card-layout.component';
import { CardDetails } from 'app/models/card';
import { ApiService } from 'services/api.service';

@Component({
	selector: 'app-second-hand-books',
	standalone: true,
	templateUrl: './second-hand-books.component.html',
	styleUrl: './second-hand-books.component.scss',
	imports: [CardLayoutComponent, CommonModule],
})
export class SecondHandBooksComponent {
	private readonly _apiService = inject(ApiService);

	cardDetails: CardDetails[] = [];

	ngOnInit(): void {
		this._apiService
			.get('secondHandBooksCards')
			.subscribe((res: any) => (this.cardDetails = res.cards));
	}
}
