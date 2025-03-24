import { Injectable } from '@angular/core';
import { Novel } from 'app/models/novels';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
	providedIn: 'root',
})
export class CartService {
	cart = new BehaviorSubject<number>(0); // Store cart count
	// Behaviour Subject - Keeps track of the latest cart count and notifies all subscribed components whenever the value changes.
	private cartItemCount = new BehaviorSubject<number>(0);
	// cartItemCount$ - Allows components to listen for cart count updates
	cartItemCount$ = this.cartItemCount.asObservable();

	// Keeps track of the latest cart items
	private cartItemsSubject = new BehaviorSubject<
		{ novelId: string; quantity: number }[]
	>([]);
	cartItems$ = this.cartItemsSubject.asObservable(); // Observable for the components

	constructor(private _apiService: ApiService) {
		this.loadCartFromServer();
	}

	/** Load cart from API */
	private async loadCartFromServer() {
		try {
			const response: any = await this._apiService.get('/cart');
			if (response && response?.cart?.items) {
				this.cartItemsSubject.next(response?.cart?.items);
				this.updateCartCount(response?.cart?.items);
			}
		} catch (error) {
			console.error('Error loading cart:', error);
		}
	}

	////////////////////////////////NEW CODE//////////////////////////////////////

	// ✅ Fetch user's cart after login
	loadCart() {
		this.getCart().subscribe((cart) => {
			this.cart.next(cart.items.length || 0);
		});
	}

	getCart() {
		return this._apiService.get<{ items: any[] }>('cart/');
	}

	/** Add item to cart */
	addToCart(novelId: string, quantity: number = 1) {
		return this._apiService
			.post(`cart/add`, { novelId, quantity })
			.pipe(
				tap(() => {
					this.cart.next(this.cart.value + 1);
				}),
			)
			.subscribe((response: any) => {
				this.cartItemsSubject.next(response?.cart?.items);
				this.updateCartCount(response?.cart?.items);
			});
	}

	/** Update item quantity */
	async updateCartQuantity(novelId: string, quantity: number) {
		if (quantity < 1) {
			await this.removeFromCart(novelId);
			return;
		}

		try {
			const response: any = await this._apiService.put('/cart/update', {
				novelId,
				quantity,
			});
			this.cartItemsSubject.next(response?.cart?.items);
			this.updateCartCount(response?.cart?.items);
		} catch (error) {
			console.error('Error updating cart:', error);
		}
	}

	/** Remove item from cart */
	removeFromCart(novelId: string) {
		return this._apiService
			.post(`cart/remove`, { novelId })
			.pipe(
				tap(() => {
					this.cart.next(this.cart.value - 1);
				}),
			)
			.subscribe((response: any) => {
				this.cartItemsSubject.next(response?.cart?.items);
				this.updateCartCount(response?.cart?.items);
			});
	}

	/** Clear cart */
	async clearCart() {
		try {
			await this._apiService.delete('/cart/clear');
			this.cartItemsSubject.next([]);
			this.cartItemCount.next(0);
		} catch (error) {
			console.error('Error clearing cart:', error);
		}
	}

	/** Update cart count */
	private updateCartCount(cart: { novelId: string; quantity: number }[]) {
		const totalItemsInCart = cart.reduce(
			(sum, item) => sum + item.quantity,
			0,
		);
		this.cartItemCount.next(totalItemsInCart);
	}
}
