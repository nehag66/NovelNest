import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { CartService } from './cart.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private authState = new BehaviorSubject<boolean>(this.isAuthenticated());

	constructor(
		private _jwtHelper: JwtHelperService,
		private _apiService: ApiService,
		private _router: Router,
		private _cartService: CartService,
	) {}

	register(user: any) {
		return this._apiService.post(`auth/register`, user);
	}

	login(credentials: any) {
		return this._apiService.post(`auth/login`, credentials);
	}

	logout() {
		localStorage.removeItem('token');
		this.authState.next(false);
		this._cartService.clearCart()
		this._router.navigate(['/']);
	}

	getToken() {
		return localStorage.getItem('token');
	}

	isAuthenticated(): boolean {
		const token = this.getToken();
		return token ? !this._jwtHelper.isTokenExpired(token) : false;
	}

	getAuthState() {
		return this.authState.asObservable();
	}
}
