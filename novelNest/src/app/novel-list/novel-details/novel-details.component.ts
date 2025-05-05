import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MaterialModule } from 'app/material.module';
import { Novel } from 'app/models/novels';
import { ApiService } from 'services/api.service';
import { CartService } from 'services/cart.service';
import { StorageService } from 'services/storage.service';
import { WishlistService } from 'services/wishlist.service';
import { CONSTANTS } from 'shared/constants';
import { calculateDiscountPercentage, getBookCondition } from 'shared/utils';

@Component({
	selector: 'app-novel-details',
	standalone: true,
	imports: [CommonModule, MaterialModule, RouterModule],
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
	currentDisplayedImg = '';
	cartItems: any;
	discountPercent = 0;
	getBookCondition = getBookCondition;

	constructor(
		private _activatedRoute: ActivatedRoute,
		private _apiService: ApiService,
		private _cartService: CartService,
		private _wishlistService: WishlistService,
		private _storageService: StorageService,
	) {}

	ngOnInit() {
		this._activatedRoute.paramMap.subscribe((params) => {
			this.novelId = params.get('id');
			if (this.novelId) this.fetchNovelDetails(this.novelId);
		});
		this.token = this._storageService.get('accessToken');
		if (this.token)
			this._cartService.getCart().subscribe((cart) => {
				this.cartItems = cart?.items;
				this.attachCartQuantity();
			});
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
		const cachedAuthors = this._storageService.get<any[]>('authors') || [];
		this._apiService
			.get<{
				message: string;
				novel: any;
			}>(`novels/${novelId}`)
			.subscribe((res) => {
				const novel = res.novel;
				const author = cachedAuthors.find(
					(a) => a._id === novel.author,
				);
				this.novelDetails = {
					title: novel.title,
					cartQuantity: novel.cartQuantity ?? 0,
					totalQuantity: novel.totalQuantity,
					price: novel.price,
					mrp: novel.mrp,
					category: novel.category,
					author: author ?? 'NA',
					id: novel._id,
					bookCondition: novel.bookCondition,
					images: novel.images.map(
						(img: any) => `${CONSTANTS.IMAGE_URL}${img}`,
					),
					user: novel.user,
				};
				this.discountPercent = calculateDiscountPercentage(
					novel.mrp,
					novel.price,
				);
			});
	}

	attachCartQuantity() {
		if (!this.novelDetails) return;

		const cartItem = this.cartItems.find((item: any) =>
			typeof item.novelId === 'object'
				? item.novelId._id === this.novelDetails.id
				: item.novelId === this.novelDetails.id,
		);

		this.novelDetails = {
			...this.novelDetails,
			cartQuantity: cartItem ? cartItem.quantity : 0,
		};
	}

	buyBtnDisabled() {
		if (!this.novelDetails.cartQuantity) return false;
		return (
			this.novelDetails.cartQuantity &&
			this.novelDetails.totalQuantity <= this.novelDetails.cartQuantity
		);
	}

	addToCart() {
		this._cartService.addToCart(
			this.novelDetails?.id,
			this.novelDetails.cartQuantity === 0
				? 1
				: this.novelDetails.cartQuantity + 1,
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

	onImageClick(img: string) {
		this.currentDisplayedImg = img;
	}

	isMobileDevice(): boolean {
		return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
	}

	shareNovel(productId: string): void {
		const productUrl = `${window.location.origin}/products/${productId}`;

		if (navigator.share && this.isMobileDevice()) {
			// 📱 Mobile native share
			navigator
				.share({
					title: 'Check out this product!',
					text: 'I found this amazing product for you!',
					url: productUrl,
				})
				.then(() => console.log('Successful share'))
				.catch((error) => console.error('Error sharing:', error));
		} else {
			// 🖥️ Desktop fallback: copy to clipboard
			navigator.clipboard
				.writeText(productUrl)
				.then(() => {
					alert('Link copied to clipboard!');
				})
				.catch((err) => {
					console.error('Could not copy text: ', err);
				});
		}
	}

}
