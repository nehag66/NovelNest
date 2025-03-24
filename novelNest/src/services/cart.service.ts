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
		this.token = localStorage.getItem('token');
		this.token && this.loadCartFromServer();
	}

	/** ✅ Load cart from API on startup */
	private loadCartFromServer() {
		this._apiService.get<{ items: any[] }>('cart').subscribe({
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
	addToCart(novelId: string, quantity: number = 1) {
		return this._apiService.post(`cart/add`, { novelId, quantity }).pipe(
			tap((response: any) => {
				this.cartItemsSubject.next(response.items);
				this.updateCartCount(response.items);
			}),
		).subscribe();
	}

	/** ✅ Update item quantity */
	updateCartQuantity(novelId: string, quantity: number) {
		if (quantity < 1) return this.removeFromCart(novelId);

		return this._apiService.put('cart/update', { novelId, quantity }).pipe(
			tap((response: any) => {
				this.cartItemsSubject.next(response.items);
				this.updateCartCount(response.items);
			}),
		);
	}

	/** ✅ Remove item from cart */
	removeFromCart(novelId: string) {
		return this._apiService.post(`cart/remove`, { novelId }).pipe(
			tap((response: any) => {
				this.cartItemsSubject.next(response.items);
				this.updateCartCount(response.items);
			}),
		);
	}

	/** ✅ Clear cart */
	clearCart() {
		return this._apiService.delete('cart/clear').pipe(
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

	/** Get quantity of a specific book */
	getBookQuantity(novelId: string): Observable<number> {
		return this.cartItems$.pipe(
			tap((items) => console.log('Cart Items:', items)), // Debugging line
			map((items) => {
				const item = items.find((book) => book.novelId === novelId);
				return item ? item.quantity : 0;
			}),
		);
	}
}
