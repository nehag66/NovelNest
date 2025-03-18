import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CLIENT_ROUTES } from 'app/app.routes';
import { CONSTANTS } from 'app/constants';
import { MaterialModule } from 'app/material.module';
import { BookCondition, Novel, NovelResponse } from 'app/models/novels';
import { map } from 'rxjs';
import { ApiService } from 'services/api.service';
import { CartService } from 'services/cart.service';
import { SharedModule } from 'shared/shared.module';

@Component({
	selector: 'buy-books',
	standalone: true,
	imports: [SharedModule, MaterialModule],
	templateUrl: './buy-books.component.html',
	styleUrl: './buy-books.component.scss',
})
export class BuyBooksComponent implements OnInit {
	novels: Novel[] = [];
	cartItems: Novel[] = [];
	isLoading: boolean = false;
	BookConditions = BookCondition;

	constructor(
		private _router: Router,
		private _apiService: ApiService,
		private _cartService: CartService,
	) {}

	ngOnInit() {
		this.isLoading = true;
		this._cartService.cartItems$.subscribe((cart) => {
			this.cartItems = cart;
			this.updateNovelsWithCart();
		});
		this.fetchNovels();
	}

	fetchNovels() {
		this._apiService
			.get<{ message: string; novels: Novel[] }>('novels')
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
			)
			.subscribe((novels: Novel[]) => {
				this.isLoading = false;
				this.novels = novels;
				this.updateNovelsWithCart();
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
		this.novels = this.novels.map((novel) => {
			const cartItem = this.cartItems.find(
				(item) => item.id === novel.id,
			);
			return { ...novel, cartQuantity: cartItem ? cartItem.quantity : 0 };
		});
	}

	goToNovelDetails(novelId: string) {
		this._router.navigate([CLIENT_ROUTES.NOVEL, novelId]);
	}

	addToCart(novel: Novel) {
		this._cartService.addToCart(novel);
	}
}
