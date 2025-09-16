import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CLIENT_ROUTES } from 'app/app.routes';
import { MaterialModule } from 'app/material.module';
import {
	BookCondition,
	Category,
	Novel,
	NovelResponse,
} from 'app/models/novel';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { catchError, map, of } from 'rxjs';
import { ApiService } from 'services/api.service';
import { CartService } from 'services/cart.service';
import { StorageService } from 'services/storage.service';
import { CONSTANTS } from 'shared/constants';
import { SharedModule } from 'shared/shared.module';
import { getBookCondition } from 'shared/utils';

@Component({
	selector: 'app-novel-list',
	standalone: true,
	imports: [SharedModule, MaterialModule, InfiniteScrollDirective],
	templateUrl: './novel-list.component.html',
	styleUrl: './novel-list.component.scss',
})
export class NovelListComponent implements OnInit {
	novels: Novel[] = [];
	cartItems: any;
	isLoading = false;
	isLoadingMore = false;
	BookConditions = BookCondition;
	getBookCondition = getBookCondition;
	isLoggedIn: string | null = null;

	page = 1;
	limit = 20;
	hasMoreNovels = true;
	categories: Category[] = [];

	searchTerm = '';

	constructor(
		private _router: Router,
		private _apiService: ApiService,
		private _cartService: CartService,
		private _storageService: StorageService,
		private _activatedRoute: ActivatedRoute,
	) {}

	ngOnInit() {
		this.isLoading = true;
		this.isLoggedIn = this._storageService.get('accessToken');

		this._activatedRoute.queryParams.subscribe((params) => {
			this.searchTerm = params['search'] || '';
			this.resetAndFetchNovels();
		});
	}

	resetAndFetchNovels() {
		this.page = 1;
		this.novels = [];
		this.hasMoreNovels = true;
		this.fetchNovels();
	}

	getCart() {
		this._cartService.getCart().subscribe((cart) => {
			this.cartItems = cart?.items;
			this.syncCartWithNovels();
		});
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
					search: this.searchTerm || '',
				},
			)
			.pipe(
				map((novelData: any) => {
					return novelData.novels.map((novel: NovelResponse) => {
						const author = cachedAuthors?.find(
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
					this.isLoading = false;
					return of([]);
				}),
			)
			.subscribe((novels: Novel[]) => {
				this.isLoadingMore = false;
				this.isLoading = false;
				this.novels = [...this.novels, ...novels];
				if (this.isLoggedIn) {
					this.getCart();
				}

				if (novels.length < this.limit) {
					this.hasMoreNovels = false;
				} else {
					this.page++;
				}
			});
	}

	// Filtered novels based on search term
	filterNovelsBySearchTerm(): Novel[] {
		if (!this.searchTerm) return this.novels;
		return this.novels.filter((novel) => {
			return (
				novel.title
					.toLowerCase()
					.includes(this.searchTerm.toLowerCase()) ||
				novel.author
					.toLowerCase()
					.includes(this.searchTerm.toLowerCase()) ||
				novel.category
					.toLowerCase()
					.includes(this.searchTerm.toLowerCase())
			);
		});
	}

	clearSearch() {
		this.searchTerm = '';
		this.resetAndFetchNovels();
		this._router.navigate([], {
			relativeTo: this._activatedRoute,
			queryParams: { search: null },
			queryParamsHandling: 'merge',
		});
	}

	editNovel(novel: Novel) {
		this._router.navigate(['/post-ad', novel.id]);
	}

	buyBtnDisabled(novel: Novel): boolean {
		if (!novel.cartQuantity || novel.cartQuantity < 0) return false;
		return novel.totalQuantity <= novel.cartQuantity;
	}

	syncCartWithNovels() {
		if (!this.cartItems) return;

		this.novels = this.novels.map((novel) => {
			const cartItem = this.cartItems.find((item: any) => {
				const cartNovelId =
					typeof item.novelId === 'string'
						? item.novelId
						: item.novelId?._id;
				return cartNovelId === novel.id;
			});

			return { ...novel, cartQuantity: cartItem ? cartItem.quantity : 0 };
		});
	}

	addToCart(novelId: string, qty: number) {
		this._cartService.addToCart(novelId, qty).subscribe((response) => {
			this.cartItems = response.items;
			this.syncCartWithNovels();
		});
	}

	goToNovelDetails(novelId: string) {
		this._router.navigate([CLIENT_ROUTES.NOVEL, novelId]);
	}

	trackByNovelId(_: number, novel: Novel): string {
		return novel.id;
	}
}
