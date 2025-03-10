import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { Router } from '@angular/router';
import { CLIENT_ROUTES } from 'app/app.routes';
import { ApiService } from 'services/api.service';
import { Novel } from 'app/models/novels';

@Component({
	selector: 'app-carousel',
	standalone: true,
	imports: [CommonModule, MaterialModule],
	templateUrl: './carousel.component.html',
	styleUrl: './carousel.component.scss',
})
export class CarouselComponent {
	currentSlide = 0;
	novels: Novel[] = [];

	constructor(
		private _router: Router,
		private _apiService: ApiService,
	) {
		this._apiService.get('novels').subscribe((res: any) => {
			this.novels = res.novels;
		});
	}

	goToBuyBooks() {
		this._router.navigate([CLIENT_ROUTES.BUY_BOOKS]);
	}

	scroll(amount: number) {
		const carousel = document.querySelector('.carousel') as HTMLElement;
		carousel.scrollBy({ left: amount, behavior: 'smooth' });
	}
}
