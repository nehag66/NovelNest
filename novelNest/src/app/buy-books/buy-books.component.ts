import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from 'services/api.service';
import { SharedModule } from 'shared/shared.module';

@Component({
	selector: 'buy-books',
	standalone: true,
	imports: [SharedModule],
	templateUrl: './buy-books.component.html',
	styleUrl: './buy-books.component.scss',
})
export class BuyBooksComponent implements OnInit {
	private readonly _apiService = inject(ApiService);
	categories: string[] = [];
	ngOnInit() {
		this._apiService.get('categories').subscribe((response: any) => {
			this.categories = response.categories;
		});
	}
}
