import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CLIENT_ROUTES } from 'app/app.routes';
import { MaterialModule } from 'app/material.module';
import { Wishlist } from 'app/models/novel';
import { take } from 'rxjs';
import { AuthService } from 'services/auth.service';
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
	cartItems: any;
	isLoggedIn: string | null = null;

	constructor(
		private _wishlistService: WishlistService,
		private _cartService: CartService,
		private _router: Router,
		private _authService: AuthService,
	) {}

	ngOnInit() {
		this.isLoggedIn = this._authService.bearerToken;
		if (this.isLoggedIn) {
			this.getWishlist();
			this._cartService.getCart().subscribe((cart) => {
				this.cartItems = cart?.items;
				this.attachCartQuantity();
			});
		}
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
		if (!this.wishlist || !this.cartItems) return;

		this.wishlist = this.wishlist.map((novel: Wishlist) => {
			const cartItem = this.cartItems.find((item: any) => {
				const cartNovelId =
					typeof item.novelId === 'string'
						? item.novelId
						: item.novelId?._id;
				return cartNovelId === novel.novelId?._id;
			});

			return { ...novel, cartQuantity: cartItem ? cartItem.quantity : 0 };
		});
	}

	addToCart(novelId: string, qty: number) {
		this._cartService.addToCart(novelId, qty).subscribe(() => {
			this._cartService.cartItems$.pipe(take(1)).subscribe((items) => {
				this.cartItems = items;
				this.attachCartQuantity();
			});
		});
	}

	buyBtnDisabled(novel: Wishlist): boolean {
		if (!novel.cartQuantity || novel.cartQuantity < 0) return false;
		return novel.novelId?.totalQuantity <= novel.cartQuantity;
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
		this._router.navigateByUrl(CLIENT_ROUTES.NOVEL_LIST);
	}

	goToNovelDetails(novelId: string) {
		this._router.navigate([CLIENT_ROUTES.NOVEL, novelId]);
	}
}
