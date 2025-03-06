import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from 'app/material.module';
import { Novels } from 'app/models/novels';
import { map } from 'rxjs';
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
		this._apiService.get<{ message: string, novels: Novels[] }>('novels')
		.pipe(map((novelData: any) => {
			return novelData.novels.map((novel: any) => {
				return {
					title: novel.title,
					quantity: novel.quantity,
					price: novel.price,
					category: novel.category,
					id: novel._id
				}
			})
		}))
		.subscribe((novels: any) => {
			this.novels = novels;
		});
	}
}

