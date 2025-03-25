import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
	providedIn: 'root',
})
export class CartService {
	token: string | null = null;
	// Store cart count
	private cartItemCount = new BehaviorSubject<number>(0);
	cartItemCount$ = this.cartItemCount.asObservable();

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
	updateCartQuantity(novelId: string, quantity: number) {
		if (quantity < 1) {
			return this.removeFromCart(novelId).subscribe(); // Ensure UI updates immediately
		}

		return this._apiService.put('cart/update', { novelId, quantity }).pipe(
			tap((response: any) => {
				this.cartItemsSubject.next(response.items);
				this.updateCartCount(response.items);
			}),
		).subscribe();
	}

	/** ✅ Remove item from cart */
	removeFromCart(novelId: string) {
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
