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
	// private cartItemCount = new BehaviorSubject<number>(0);
	// cartItemCount$ - Allows components to listen for cart count updates

	// cartItemCount$ = this.cartItemCount.asObservable();

	// Keeps track of the latest cart items
	// private cartItemsSubject = new BehaviorSubject<Novel[]>([]);
	// cartItems$ = this.cartItemsSubject.asObservable(); // Observable for the components

	constructor(private _apiService: ApiService) {
		// const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
		// this.cartItemsSubject.next(savedCart);
		// this.cartItemCount.next(savedCart.length);
		// this.loadCartFromStorage();
	}

	/** Load cart from localStorage and update BehaviorSubjects */
	/* private loadCartFromStorage() {
		const storedCart = localStorage.getItem('cart');
		const parsedCart = storedCart ? JSON.parse(storedCart) : [];

		// Remove duplicates and sum quantities
		const cleanedCart = this.removeDuplicatesAndSumQuantities(parsedCart);

		this.cartItemsSubject.next(cleanedCart);
		this.updateCartCount(cleanedCart);
		localStorage.setItem('cart', JSON.stringify(cleanedCart));
	} */

	/* addToCart(item: Novel) {
		const currentCart = [...this.cartItemsSubject.value];
		const existingItemIndex = currentCart.findIndex(
			(cartItem) => cartItem.id === item.id,
		);

		if (existingItemIndex !== -1) {
			currentCart[existingItemIndex].quantity++;
		} else {
			currentCart.push({ ...item, quantity: 1 });
		}

		const cleanedCart = this.removeDuplicatesAndSumQuantities(currentCart);
		this.cartItemsSubject.next(cleanedCart);
		this.updateCartCount(cleanedCart);
		localStorage.setItem('cart', JSON.stringify(cleanedCart));
	} */

	/* private removeDuplicatesAndSumQuantities(cart: Novel[]): Novel[] {
		const cartMap = new Map<string, Novel>();

		cart.forEach((item) => {
			if (cartMap.has(item.id)) {
				cartMap.get(item.id)!.quantity += item.quantity;
			} else {
				cartMap.set(item.id, { ...item });
			}
		});

		return Array.from(cartMap.values());
	}

	private updateCartCount(cart: Novel[]) {
		const totalItemsInCart = cart.reduce(
			(sum, item) => sum + item.quantity,
			0,
		);
		this.cartItemCount.next(totalItemsInCart);
	} */

	/* getCartItems(): Novel[] {
		return this.cartItemsSubject.value;
	}

	updateCartQuantity(item: Novel, quantity: number) {
		const updatedCart = this.cartItemsSubject.value.map((cartItem) =>
			cartItem.id === item.id ? { ...cartItem, quantity } : cartItem,
		);

		this.cartItemsSubject.next(updatedCart);
		localStorage.setItem('cart', JSON.stringify(updatedCart));
		this.cartItemCount.next(
			updatedCart.reduce((sum, item) => sum + item.quantity, 0),
		);
	} */

	/* removeFromCart(item: Novel) {
		const updatedCart = this.cartItemsSubject.value.filter(
			(cartItem) => cartItem.id !== item.id,
		);
		this.cartItemsSubject.next(updatedCart);
		localStorage.setItem('cart', JSON.stringify(updatedCart));
		this.cartItemCount.next(
			updatedCart.reduce((sum, item) => sum + item.quantity, 0),
		);
	} */

	/* clearCart() {
		localStorage.removeItem('cart');
		this.cartItemCount.next(0); // Reset count to 0
	} */

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

	addToCart(novelId: string, quantity: number = 1) {
		return this._apiService.post(`cart/add`, { novelId, quantity }).pipe(
			tap(() => {
				this.cart.next(this.cart.value + 1);
			}),
		).subscribe((res) => console.log(res))
	}

	removeFromCart(novelId: string) {
		return this._apiService.post(`cart/remove`, { novelId }).pipe(
			tap(() => {
				this.cart.next(this.cart.value - 1);
			}),
		).subscribe((res) => console.log(res))
	}
}
