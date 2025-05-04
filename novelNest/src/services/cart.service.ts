import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from './api.service';
import { CartResponse, Novel } from 'app/models/novels';
import { StorageService } from './storage.service';

@Injectable({
	providedIn: 'root',
})
export class CartService {
	novelDetails!: Novel;
	token: string | null = null;
	// Store cart count
	private cartItemCount = new BehaviorSubject<number>(0);
	cartItemCount$ = this.cartItemCount.asObservable();
	// cartItems = [];
	cartItems: any;

	// Store cart items
	private cartItemsSubject = new BehaviorSubject<
		{ novelId: string; quantity: number }[]
	>([]);
	cartItems$ = this.cartItemsSubject.asObservable();

	constructor(
		private _apiService: ApiService,
		private _storageService: StorageService,
	) {
		if (this.bearerToken) this.loadCartFromServer();
	}

	get bearerToken() {
		return this._storageService.get('accessToken');
	}

	/** ✅ Load cart from API on startup */
	private loadCartFromServer() {
		if (this.bearerToken) {
			this.getCart().subscribe({
				next: (response) => {
					this.cartItemsSubject.next(response.items);
					this.updateCartCount(response.items);
				},
				error: (error) => console.error('Error loading cart:', error),
			});
		}
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
					this.cartItemsSubject.next(response.items); // Update cart items
					this.updateCartCount(response.items); // Ensure count is updated
				}),
			)
			.subscribe(() => this.fetchCart());
	}

	fetchCart() {
		this.getCart().subscribe((response: any) => {
			this.cartItemsSubject.next(response.items);
			this.updateCartCount(response.items);
		});
	}

	/** ✅ Update item quantity */
	updateCartQuantity(novel: CartResponse, quantity: number) {
		if (quantity < 1) {
			return this.removeFromCart(novel).subscribe(() => this.fetchCart()); // Ensure UI updates immediately
		}

		return this._apiService
			.put('cart/update', { novel, quantity })
			.pipe(
				tap((response: any) => {
					this.cartItemsSubject.next(response.items);
					this.updateCartCount(response.items);
				}),
			)
			.subscribe();
	}

	/** ✅ Remove item from cart */
	removeFromCart(novel?: any) {
		const novelId = novel?.novelId?._id;
		return this._apiService.delete(`cart/remove`, { novelId }).pipe(
			tap((response: any) => {
				this.cartItemsSubject.next(response.cart?.items);
				this.updateCartCount(response.cart?.items);
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
