import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from 'services/api.service';

@Component({
	selector: 'sell-used-books',
	standalone: true,
	imports: [],
	templateUrl: './sell-used-books.component.html',
	styleUrl: './sell-used-books.component.scss',
})
export class SellUsedBooksComponent implements OnInit {
	private readonly _apiService = inject(ApiService);
	ngOnInit() {
		this._apiService.get('novels').subscribe((response) => {
			console.log(response);
		});
	}
}
