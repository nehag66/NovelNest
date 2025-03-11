import { CommonModule } from '@angular/common';
import {
	Component,
	ElementRef,
	OnDestroy,
	OnInit,
	ViewChild,
} from '@angular/core';
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
export class CarouselComponent implements OnInit, OnDestroy {
	@ViewChild('carousel', { static: false }) carousel!: ElementRef;
	private intervalId: any;
	novels: Novel[] = [];

	constructor(
		private _router: Router,
		private _apiService: ApiService,
	) {}

	ngOnInit() {
		this._apiService.get('novels').subscribe((res: any) => {
			this.novels = res.novels;
		});
		this.startAutoScroll();
	}

	goToBuyBooks() {
		this._router.navigate([CLIENT_ROUTES.BUY_BOOKS]);
	}

	scroll(amount: number) {
		this.carousel.nativeElement.scrollBy({
			left: amount,
			behavior: 'smooth',
		});
	}

	startAutoScroll() {
		this.intervalId = setInterval(() => {
			this.scroll(200);
		}, 3000);
	}

	stopAutoScroll() {
		if (this.intervalId) clearInterval(this.intervalId);
	}

	buyNow() {}

	ngOnDestroy() {
		this.stopAutoScroll();
	}
}
