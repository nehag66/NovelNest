import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from 'app/material.module';
import { Novels } from 'app/models/novels';
import { ApiService } from 'services/api.service';
import { SharedModule } from 'shared/shared.module';

@Component({
	selector: 'buy-books',
	standalone: true,
	imports: [SharedModule, MaterialModule],
	templateUrl: './buy-books.component.html',
	styleUrl: './buy-books.component.scss',
})
export class BuyBooksComponent implements OnInit {
	private readonly _apiService = inject(ApiService);
	novels: Novels[] = [];
	ngOnInit() {
		this._apiService.get('novels').subscribe((response: any) => {
			this.novels = response.novels;
		});
	}
}
