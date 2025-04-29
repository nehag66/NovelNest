import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CLIENT_ROUTES } from 'app/app.routes';
import { MaterialModule } from 'app/material.module';
import { CartResponse, Wishlist } from 'app/models/novels';
import { CartService } from 'services/cart.service';
import { WishlistService } from 'services/wishlist.service';
import { CONSTANTS } from 'shared/constants';

@Component({
	selector: 'app-wishlist',
	standalone: true,
	imports: [CommonModule, MaterialModule],
	templateUrl: './wishlist.component.html',
	styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit {
	wishlist: any;
	cartItems: CartResponse[] = [];

	constructor(
		private _wishlistService: WishlistService,
		private _cartService: CartService,
		private _router: Router,
	) {}

	ngOnInit() {
		if (this.isLoggedIn()) {
			this.getWishlist();
			this._cartService.getCart().subscribe((cart) => {
				this.cartItems = cart?.items;
				this.attachCartQuantity();
			});
		}
	}

	isLoggedIn(): boolean {
		return !!localStorage.getItem('accessToken');
	}

	getWishlist() {
		this._wishlistService.getWishlist().subscribe((data) => {
			this.wishlist = data.items.map((item: Wishlist) => ({
				...item,
				novelId: {
					...item.novelId,
					images:
						item.novelId?.images?.map(
							(img: string) => `${CONSTANTS.IMAGE_URL}${img}`,
						) || [],
				},
			}));
		});
	}

	attachCartQuantity() {
		if (!this.wishlist) return;

		this.wishlist = this.wishlist.map((novel: Wishlist) => {
			const cartItem = this.cartItems.find(
				(item: any) => item.novelId?._id === novel.novelId?._id,
			);
			return { ...novel, cartQuantity: cartItem ? cartItem.quantity : 0 };
		});
	}

	buyBtnDisabled(novel: Wishlist): boolean {
		if (!novel.cartQuantity || novel.cartQuantity < 0) return false;
		return novel.novelId?.totalQuantity <= novel.cartQuantity;
	}

	addToCart(novelId: string, qty: number) {
		this._cartService.addToCart(novelId, qty);
		this.attachCartQuantity();
	}

	removeFromWishlist(novelId: string) {
		this._wishlistService.removeFromWishlist(novelId).subscribe({
			next: () => {
				this.getWishlist();
			},
			error: (err) => {
				console.error('Failed to remove novel from wishlist', err);
			},
		});
	}

	goToBuyBooks() {
		this._router.navigate([CLIENT_ROUTES.ALL_BOOKS]);
	}

	goToNovelDetails(novelId: string) {
		this._router.navigate([CLIENT_ROUTES.NOVEL, novelId]);
	}
}
