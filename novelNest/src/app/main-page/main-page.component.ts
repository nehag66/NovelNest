import { Component } from '@angular/core';
import { SecondHandBooksComponent } from './second-hand-books/second-hand-books.component';
import { SellOldBooksComponent } from './sell-old-books/sell-old-books.component';
import { AdBannerComponent } from './ad-banner/ad-banner.component';
import { DescriptionComponent } from './description/description.component';
import { BannerComponent } from './banner/banner.component';

@Component({
	selector: 'main-page',
	standalone: true,
	imports: [
		SecondHandBooksComponent,
		SellOldBooksComponent,
		AdBannerComponent,
		DescriptionComponent,
		BannerComponent,
	],
	templateUrl: './main-page.component.html',
	styleUrl: './main-page.component.scss',
})
export class MainPageComponent {}
