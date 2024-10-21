import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from './material.module';
import { BannerComponent } from './main-page/banner/banner.component';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './main-page/carousel/carousel.component';
import { DescriptionComponent } from './main-page/description/description.component';
import { AdBannerComponent } from './main-page/ad-banner/ad-banner.component';
import { SellOldBooksComponent } from './main-page/sell-old-books/sell-old-books.component';
import { SellUsedBooksComponent } from './main-page/sell-used-books/sell-used-books.component';
import { PageNotFoundComponent } from './reusable-components/card-layout/page-not-found/page-not-found.component';
import { MainPageComponent } from './main-page/main-page.component';

@Component({
	selector: 'app-root',
	standalone: true,
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	imports: [
		RouterOutlet,
		HeaderComponent,
		MaterialModule,
		CommonModule,
		MainPageComponent,
	],
})
export class AppComponent {}
