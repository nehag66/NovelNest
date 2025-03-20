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
import { Novel, NovelResponse } from 'app/models/novels';
import { catchError, map, of } from 'rxjs';
import { CONSTANTS } from 'app/constants';

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

	page = 1;
	limit = 10;
	hasMoreNovels = true;
	isLoadingMore = false;

	constructor(
		private _router: Router,
		private _apiService: ApiService,
	) {}

	ngOnInit() {
		this.fetchNovels();
		this.startAutoScroll();
	}

	fetchNovels() {
		if (!this.hasMoreNovels || this.isLoadingMore) return;

		this.isLoadingMore = true;

		this._apiService
			.get<{ message: string; novels: Novel[]; totalPages: number }>(
				'novels',
				{
					page: this.page,
					limit: this.limit,
				},
			)
			.pipe(
				map((novelData: any) => {
					return novelData.novels.map((novel: NovelResponse) => {
						return {
							title: novel.title,
							quantity: novel.quantity,
							totalQuantity: novel.totalQuantity,
							price: novel.price,
							category: novel.category,
							author: novel.author,
							id: novel._id,
							bookCondition: novel.bookCondition,
							images: novel.images.map(
								(img: any) => `${CONSTANTS.IMAGE_URL}${img}`,
							),
						};
					});
				}),
				catchError((error) => {
					console.error('Error fetching novels:', error);
					return of([]); // Return an empty array if API fails
				}),
			)
			.subscribe((novels: Novel[]) => {
				this.isLoadingMore = false;
				this.novels = [...this.novels, ...novels];

				// Check if there are more novels to load
				if (novels.length < this.limit) {
					this.hasMoreNovels = false;
				} else {
					this.page++;
				}
			});
	}

	goToBuyBooks() {
		this._router.navigate([CLIENT_ROUTES.ALL_BOOKS]);
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

			if (this.hasMoreNovels) {
				this.fetchNovels();
			}
		}, 3000);
	}

	stopAutoScroll() {
		if (this.intervalId) clearInterval(this.intervalId);
	}

	buyNow(novelId: string) {
		this._router.navigate([CLIENT_ROUTES.NOVEL, novelId]);
	}

	ngOnDestroy() {
		this.stopAutoScroll();
	}
}
