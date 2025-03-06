import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { Router } from '@angular/router';
import { CLIENT_ROUTES } from 'app/app.routes';

@Component({
	selector: 'app-carousel',
	standalone: true,
	imports: [CommonModule, MaterialModule],
	templateUrl: './carousel.component.html',
	styleUrl: './carousel.component.scss',
})
export class CarouselComponent {
	private readonly _router = inject(Router);
	currentSlide = 0;
	slides = [
		{
			image: 'carousel 1.jpg',
			caption: 'Slide 1',
		},
		{
			image: 'carousel 2.jpg',
			caption: 'Slide 2',
		},
		{
			image: 'carousel 3.jpg',
			caption: 'Slide 3',
		},
		{
			image: 'carousel 4.jpg',
			caption: 'Slide 4',
		},
		{
			image: 'carousel 5.jpg',
			caption: 'Slide 5',
		},
	];

	nextSlide() {
		this.currentSlide = (this.currentSlide + 1) % this.slides.length;
	}

	previousSlide() {
		this.currentSlide =
			(this.currentSlide - 1 + this.slides.length) % this.slides.length;
	}
	goToBuyBooks() {
		this._router.navigate([CLIENT_ROUTES.BUY_BOOKS]);
	}
}
