import { Component, OnInit } from '@angular/core';
import { SecondHandBooksComponent } from './second-hand-books/second-hand-books.component';
import { SellOldBooksComponent } from './sell-old-books/sell-old-books.component';
import { AdBannerComponent } from './ad-banner/ad-banner.component';
import { DescriptionComponent } from './description/description.component';
import { BannerComponent } from './banner/banner.component';
import { CarouselComponent } from './carousel/carousel.component';
import { StorageService } from 'services/storage.service';
import { ApiService } from 'services/api.service';
import { AuthorResponse, AuthorSummary } from 'app/models/author';

@Component({
	selector: 'app-main-page',
	standalone: true,
	imports: [
		SecondHandBooksComponent,
		SellOldBooksComponent,
		AdBannerComponent,
		DescriptionComponent,
		BannerComponent,
		CarouselComponent,
	],
	templateUrl: './main-page.component.html',
	styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit {
	constructor(
		private _storageService: StorageService,
		private _apiService: ApiService,
	) {}

	ngOnInit() {
		// TODO: Add categories to localstorage too
		const authors = this._storageService.get('authors');
		if (!authors) {
			this._apiService
				.get<{
					message: string;
					authors: AuthorSummary[];
				}>(`authors`)
				.subscribe((authors: AuthorResponse) => {
					this._storageService.set('authors', authors.authors);
				});
		}
	}
}
