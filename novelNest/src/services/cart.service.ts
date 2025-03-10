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

	private cartItems: Novel[] = [];

	constructor() {
		const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
		this.cartItems = savedCart;
		this.cartItemCount.next(this.cartItems.length);
	}

	addToCart(item: Novel) {
		this.cartItems.push(item);
		localStorage.setItem('cart', JSON.stringify(this.cartItems));
		this.cartItemCount.next(this.cartItems.length);
	}

	getCartItems() {
		return this.cartItems;
	}

	removeFromCart(index: number) {
		this.cartItems.splice(index, 1);
		localStorage.setItem('cart', JSON.stringify(this.cartItems));
		this.cartItemCount.next(this.cartItems.length);
	}
}
