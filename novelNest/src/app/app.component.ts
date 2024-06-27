import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from './material.module';
import { BannerComponent } from './banner/banner.component';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel/carousel.component';

@Component({
	selector: 'app-root',
	standalone: true,
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	imports: [
		RouterOutlet,
		HeaderComponent,
		MaterialModule,
		BannerComponent,
		CommonModule,
		CarouselComponent,
	],
})
export class AppComponent {}
