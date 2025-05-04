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
import { CONSTANTS } from 'shared/constants';
import { StorageService } from 'services/storage.service';

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
	limit = 20;
	hasMoreNovels = true;
	isLoadingMore = false;

	constructor(
		private _router: Router,
		private _apiService: ApiService,
		private _storageService: StorageService,
	) {}

	ngOnInit() {
		this.fetchNovels();
		this.startAutoScroll();
	}

	fetchNovels() {
		if (!this.hasMoreNovels || this.isLoadingMore) return;

		this.isLoadingMore = true;
		const cachedAuthors = this._storageService.get<any[]>('authors') || [];
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
						const author = cachedAuthors.find(
							(a) => a._id === novel.author,
						);
						return {
							title: novel.title,
							totalQuantity: novel.totalQuantity,
							price: novel.price,
							mrp: novel.mrp,
							category: novel.category,
							author: author?.name ?? 'NA',
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
					return of([]);
				}),
			)
			.subscribe((novels: Novel[]) => {
				this.isLoadingMore = false;
				this.novels = [...this.novels, ...novels];

				if (novels.length < this.limit) {
					this.hasMoreNovels = false;
				} else {
					this.page++;
				}
			});
	}

	goToBuyBooks() {
		this._router.navigateByUrl(CLIENT_ROUTES.NOVEL_LIST);
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
