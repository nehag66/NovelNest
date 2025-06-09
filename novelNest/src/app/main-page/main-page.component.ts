import { Component, OnInit } from '@angular/core';
import { SecondHandBooksComponent } from './second-hand-books/second-hand-books.component';
import { SellOldBooksComponent } from './sell-old-books/sell-old-books.component';
import { AdBannerComponent } from './ad-banner/ad-banner.component';
import { DescriptionComponent } from './description/description.component';
import { BannerComponent } from './banner/banner.component';
import { CarouselComponent } from './carousel/carousel.component';
import { AuthService } from 'services/auth.service';
import { CacheService } from 'services/cache.service';

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
		private _cacheService: CacheService,
		private _authService: AuthService,
	) {}

	ngOnInit() {
		this._authService.loginStatusChanged.subscribe(() => {
			this.afterLogin();
		});
	}

	afterLogin() {
		this._cacheService.cacheUserInfo();
		this._cacheService.cacheCategories();
		this._cacheService.cacheAuthors();
	}
}
