import { Injectable } from '@angular/core';
import { Novel } from 'app/models/novels';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class CartService {
	// Behaviour Subject - Keeps track of the latest cart count and notifies all subscribed components whenever the value changes.
	private cartItemCount = new BehaviorSubject<number>(0);
	// cartCount$ - Allows components to listen for cart count updates
	cartCount$ = this.cartItemCount.asObservable();

	// Keeps track of the latest cart items
	private cartItemsSubject = new BehaviorSubject<Novel[]>([]);
	cartItems$ = this.cartItemsSubject.asObservable(); // Observable for the components

	constructor() {
		const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
		this.cartItemsSubject.next(savedCart);
		this.cartItemCount.next(savedCart.length);
	}

	/* addToCart(item: Novel) {
		const updatedCart = [...this.cartItemsSubject.value, item];
		this.cartItemsSubject.next(updatedCart);
		localStorage.setItem('cart', JSON.stringify(updatedCart));
		this.cartItemCount.next(updatedCart.length);
	} */

	addToCart(item: Novel) {
		// Get current cart items
		const currentCart = [...this.cartItemsSubject.value];

		// Find if item already exists in cart
		const existingItemIndex = currentCart.findIndex(
			(cartItem) => cartItem.id === item.id,
		);

		if (existingItemIndex !== -1) {
			// If item exists, increase its quantity
			currentCart[existingItemIndex].quantity++;
		} else {
			// If not in cart, add item with quantity 1
			currentCart.push({ ...item, quantity: 1 });
		}

		// Update cart state and local storage
		this.cartItemsSubject.next(currentCart);
		localStorage.setItem('cart', JSON.stringify(currentCart));

		// Update cart count (total items in cart)
		const totalItemsInCart = currentCart.reduce(
			(sum, cartItem) => sum + cartItem.quantity,
			0,
		);
		this.cartItemCount.next(totalItemsInCart);

		//cartcount is not getting updated in the right way. check it once.
	}

	getCartItems() {
		return this.cartItemsSubject.asObservable(); // Now returns an observable
	}

	removeFromCart(index: number) {
		const updatedCart = [...this.cartItemsSubject.value];
		updatedCart.splice(index, 1);
		this.cartItemsSubject.next(updatedCart);
		localStorage.setItem('cart', JSON.stringify(updatedCart));
		this.cartItemCount.next(updatedCart.length);
	}
}
