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

	addToCart(item: Novel) {
		const updatedCart = [...this.cartItemsSubject.value, item];
		this.cartItemsSubject.next(updatedCart);
		localStorage.setItem('cart', JSON.stringify(updatedCart));
		this.cartItemCount.next(updatedCart.length);
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
