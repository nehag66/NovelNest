import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from 'app/material.module';
import { ApiService } from 'services/api.service';
import { SharedModule } from 'shared/shared.module';

@Component({
	selector: 'sell-used-books',
	standalone: true,
	imports: [MaterialModule, SharedModule],
	templateUrl: './sell-used-books.component.html',
	styleUrl: './sell-used-books.component.scss',
})
export class SellUsedBooksComponent implements OnInit {
	private readonly _apiService = inject(ApiService);
	categories: string[] = [];
	isLoggedIn = false;
	ngOnInit() {
		this._apiService.get('categories').subscribe((response: any) => {
			this.categories = response.categories;
		});
	}
}
