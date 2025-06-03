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
import { Category, CategoryResponse } from 'app/models/novels';
import { ProfileResponse } from 'app/models/profile';
import { AuthService } from 'services/auth.service';

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
	userId: string | null = '';
	constructor(
		private _storageService: StorageService,
		private _apiService: ApiService,
		private _authService: AuthService,
	) {}

	ngOnInit() {
		this._authService.loginStatusChanged.subscribe(() => {
			this.afterLogin();
		});
	}

	afterLogin() {
		this.userId = this._storageService.get<string>('userId');
		this.cacheUserInfo();
		this.cacheCategories();
		this.cacheAuthors();
	}

	cacheUserInfo() {
		const userInfo = this._storageService.get('userInfo');
		if (!userInfo) {
			this._apiService
				.get<{
					message: string;
					user: ProfileResponse;
				}>(`users/${this.userId}`)
				.subscribe(
					(userInfo: { message: string; user: ProfileResponse }) => {
						this._storageService.set('userInfo', userInfo.user);
					},
				);
		}
	}

	cacheAuthors() {
		const authors = this._storageService.get('authors');
		if (!authors) {
			this._apiService
				.get<{
					message: string;
					authors: AuthorSummary[];
				}>('authors')
				.subscribe((authors: AuthorResponse) => {
					this._storageService.set('authors', authors.authors);
				});
		}
	}

	cacheCategories() {
		const categories = this._storageService.get('categories');
		if (!categories) {
			this._apiService
				.get<{
					message: string;
					categories: Category[];
				}>('categories')
				.subscribe((categories: CategoryResponse) => {
					this._storageService.set(
						'categories',
						categories.categories,
					);
				});
		}
	}
}
