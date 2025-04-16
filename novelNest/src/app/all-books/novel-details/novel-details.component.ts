import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MaterialModule } from 'app/material.module';
import { BookCondition, Novel, NovelResponse } from 'app/models/novels';
import { ApiService } from 'services/api.service';
import { CartService } from 'services/cart.service';
import { WishlistService } from 'services/wishlist.service';
import { CONSTANTS } from 'shared/constants';

@Component({
	selector: 'app-novel-details',
	standalone: true,
	imports: [CommonModule, MaterialModule],
	templateUrl: './novel-details.component.html',
	styleUrl: './novel-details.component.scss',
})
export class NovelDetailsComponent implements OnInit {
	novelDetails!: Novel;
	novelId: string | null = null;
	cartQuantity = 0;
	isFavorite = false;
	token: string | null = null;
	wishlist: any[] = [];

	constructor(
		private _activatedRoute: ActivatedRoute,
		private _apiService: ApiService,
		private _cartService: CartService,
		private _wishlistService: WishlistService,
	) {}

	ngOnInit() {
		this._activatedRoute.paramMap.subscribe((params) => {
			this.novelId = params.get('id');
			if (this.novelId) this.fetchNovelDetails(this.novelId);
		});
		this.token = localStorage.getItem('accessToken');
		if (this.token) this._cartService.getCart().subscribe();
		this._wishlistService.getWishlist().subscribe((data) => {
			this.wishlist = data.items || [];
			this.getFavorites();
		});
	}

	getFavorites(): void {
		this.isFavorite = this.wishlist?.some(
			(item) => item.novelId?._id === this.novelId,
		);
	}

	fetchNovelDetails(novelId: string) {
		this._apiService
			.get<{
				message: string;
				novel: NovelResponse;
			}>(`novels/${novelId}`)
			.subscribe((res) => {
				const novel = res.novel;
				this.novelDetails = {
					title: novel.title,
					quantity: novel.quantity ?? 0,
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
	}

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

	buyBtnDisabled() {
		if (!this.cartQuantity) return false;
		return (
			this.cartQuantity &&
			this.novelDetails.totalQuantity <= this.cartQuantity
		);
	}

	addToCart() {
		this._cartService.addToCart(
			this.novelDetails?.id,
			this.novelDetails.quantity,
		);
	}

	toggleHeart() {
		if (this.novelId) {
			if (this.isFavorite) {
				this._wishlistService
					.removeFromWishlist(this.novelId)
					.subscribe(() => {
						this.wishlist = this.wishlist.filter(
							(item) => item.novelId._id !== this.novelId,
						);
						this.getFavorites();
					});
			} else {
				this._wishlistService
					.addToWishlist(this.novelId)
					.subscribe((data) => {
						this.wishlist = data.wishlist.map((item: any) => ({
							novelId:
								typeof item.novelId === 'string'
									? { _id: item.novelId }
									: item.novelId,
						}));
						this.getFavorites();
					});
			}
		}
	}
}
