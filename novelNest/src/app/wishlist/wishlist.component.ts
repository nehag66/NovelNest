import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from 'app/material.module';
import { Novel } from 'app/models/novels';
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
export class WishlistComponent {
	wishlist: any[] = [];

	constructor(
		private _wishlistService: WishlistService,
		private _cartService: CartService,
	) {
		this._wishlistService.getWishlist().subscribe((data) => {
			this.wishlist = data.items.map((item: any) => ({
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

	isLoggedIn(): boolean {
		return !!localStorage.getItem('accessToken');
	}

	buyBtnDisabled(novel: Novel) {
		if (!novel.cartQuantity) return false;
		return novel.cartQuantity && novel.totalQuantity <= novel.cartQuantity;
	}

	addToCart(novelId: string, qty: number) {
		this._cartService.addToCart(novelId, qty);
	}

	removeFromWishlist() {}

}
