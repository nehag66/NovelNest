import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CLIENT_ROUTES } from 'app/app.routes';
import { MaterialModule } from 'app/material.module';
import { Novel } from 'app/models/novels';
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
	novels: Novel[] = [];
	constructor(private _router: Router) {}
	ngOnInit() {
		this._apiService
			.get<{ message: string; novels: Novel[] }>('novels')
			.pipe(
				map((novelData: any) => {
					return novelData.novels.map((novel: any) => {
						return {
							title: novel.title,
							quantity: novel.quantity,
							price: novel.price,
							category: novel.category,
							author: novel.author,
							id: novel._id,
						};
					});
				}),
			)
			.subscribe((novels: any) => {
				this.novels = novels;
			});
	}

	goToNovelDetails(novelId: string) {
		this._router.navigate([CLIENT_ROUTES.NOVEL, novelId]);
	}

	addToCart() {}
	buyNow() {}
}
