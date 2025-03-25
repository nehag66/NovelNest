import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CLIENT_ROUTES } from 'app/app.routes';
import { MaterialModule } from 'app/material.module';
import { BookCondition, Novel, NovelResponse } from 'app/models/novels';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { catchError, map, of } from 'rxjs';
import { ApiService } from 'services/api.service';
import { CartService } from 'services/cart.service';
import { CONSTANTS } from 'shared/constants';
import { SharedModule } from 'shared/shared.module';

@Component({
	selector: 'all-books',
	standalone: true,
	imports: [SharedModule, MaterialModule, InfiniteScrollDirective],
	templateUrl: './all-books.component.html',
	styleUrl: './all-books.component.scss',
})
export class AllBooksComponent implements OnInit {
	novels: Novel[] = [];
	cartItems: any;
	isLoading: boolean = false;
	isLoadingMore = false;
	BookConditions = BookCondition;

	page = 1;
	limit = 10;
	hasMoreNovels = true;

	constructor(
		private _router: Router,
		private _apiService: ApiService,
		private _cartService: CartService,
	) {}

	ngOnInit() {
		this.isLoading = true;
		this.fetchNovels();
	}

	getCart() {
		this._cartService.getCart().subscribe((cart) => {
			this.cartItems = cart?.items;
			this.updateNovelsWithCart();
		});
	}

	//this isLoggedIn method is duplicate in many other components - FIX THIS
	isLoggedIn(): boolean {
		return !!localStorage.getItem('token');
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
					this.isLoading = false;
					return of([]); // Return an empty array if API fails
				}),
			)
			.subscribe((novels: Novel[]) => {
				this.isLoadingMore = false;
				this.isLoading = false;
				this.novels = [...this.novels, ...novels];
				this.getCart();
				this.updateNovelsWithCart();

				// Check if there are more novels to load
				if (novels.length < this.limit) {
					this.hasMoreNovels = false;
				} else {
					this.page++;
				}
			});
	}

	//this getBookCondition method is duplicate in this component and novel details component - FIX THIS
	getBookCondition(condition: string): string {
		switch (condition) {
			case BookCondition.Excellent:
				return 'Excellent';
			case BookCondition.Good:
				return 'Good';
			case BookCondition.Fair:
				return 'Fair';
			default:
				return 'Unknown';
		}
	}

	editNovel(novel: Novel) {
		this._router.navigate(['/post-ad', novel.id]); // Navigate to the edit page
	}

	buyBtnDisabled(novel: Novel) {
		if (!novel.cartQuantity) return false;
		return novel.cartQuantity && novel.totalQuantity <= novel.cartQuantity;
	}

	updateNovelsWithCart() {
		if (!this.cartItems) return;

		this.novels = this.novels.map((novel) => {
			const cartItem = this.cartItems.find(
				(item: any) => item.novelId?._id === novel.id,
			);
			return { ...novel, cartQuantity: cartItem ? cartItem.quantity : 0 };
		});
	}

	goToNovelDetails(novelId: string) {
		this._router.navigate([CLIENT_ROUTES.NOVEL, novelId]);
	}

	addToCart(novelId: string, qty: number) {
		this._cartService.addToCart(novelId, qty);
	}
}
