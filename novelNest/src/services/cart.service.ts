import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { ApiService } from './api.service';
import { Novel, NovelResponse } from 'app/models/novels';
import { CONSTANTS } from 'shared/constants';

@Injectable({
	providedIn: 'root',
})
export class CartService {
	novelDetails!: Novel;
	token: string | null = null;
	// Store cart count
	private cartItemCount = new BehaviorSubject<number>(0);
	cartItemCount$ = this.cartItemCount.asObservable();
	cartItems = [];

	// Store cart items
	private cartItemsSubject = new BehaviorSubject<
		{ novelId: string; quantity: number }[]
	>([]);
	cartItems$ = this.cartItemsSubject.asObservable();

	constructor(private _apiService: ApiService) {
		this.bearerToken && this.loadCartFromServer();
	}

	get bearerToken() {
		return localStorage.getItem('token');
	}

	/** ✅ Load cart from API on startup */
	private loadCartFromServer() {
		this.getCart().subscribe({
			next: (response) => {
				this.cartItemsSubject.next(response.items);
				this.updateCartCount(response.items);
			},
			error: (error) => console.error('Error loading cart:', error),
		});
	}

	/** ✅ Get cart */
	getCart(): Observable<{ items: any[] }> {
		return this._apiService.get<{ items: any[] }>('cart');
	}

	/** ✅ Add item to cart */
	addToCart(novelId: string, quantity: number) {
		return this._apiService
			.post(`cart/add`, { novelId, quantity })
			.pipe(
				tap((response: any) => {
					this.cartItemsSubject.next(response.cart?.items); // Update cart items
					this.updateCartCount(response.cart?.items); // Ensure count is updated
				}),
			)
			.subscribe();
	}

	fetchCart() {
		this.getCart().subscribe((response: any) => {
			this.cartItemsSubject.next(response.items);
			this.updateCartCount(response.items);
		});
	}

	/** ✅ Update item quantity */
	updateCartQuantity(novel: NovelResponse, quantity: number) {
		if (quantity < 1) {
			return this.removeFromCart(novel).subscribe(); // Ensure UI updates immediately
		}

		return this._apiService.put('cart/update', { novel, quantity }).pipe(
			tap((response: any) => {
				this.cartItemsSubject.next(response.items);
				this.updateCartCount(response.items);
			}),
		).subscribe((res:any) => {
			/* console.log(res)
			this.cartItems = res.items?.map((ele: any) => {
				return this.fetchNovelDetails(ele.novelId);
			})
			console.log(this.cartItems) */
		});
	}

	/* fetchNovelDetails(novelId: string) {
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
		} */

	/** ✅ Remove item from cart */
	removeFromCart(novel?: any) {
		let novelId = novel?.novelId?._id;
		return this._apiService.delete(`cart/remove`, { novelId }).pipe(
			tap((response: any) => {
				this.cartItemsSubject.next(response.items);
				this.updateCartCount(response.items);
			}),
		);
	}

	/** ✅ Clear cart */
	clearCart() {
		return this._apiService.delete('cart/remove').pipe(
			tap(() => {
				this.cartItemsSubject.next([]);
				this.cartItemCount.next(0);
			}),
		);
	}

	/** ✅ Update cart count */
	private updateCartCount(cart: { novelId: string; quantity: number }[]) {
		const totalItemsInCart = cart.reduce(
			(sum, item) => sum + item.quantity,
			0,
		);
		this.cartItemCount.next(totalItemsInCart);
	}
}
