import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { CartService } from './cart.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private authState = new BehaviorSubject<boolean>(this.isAuthenticated());
	token: string | null = null;

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
		return this._apiService
			.post<{ token: string }>(`auth/login`, credentials, false)
			.pipe(
				tap((res) => {
					localStorage.setItem('token', res.token);
					this.token = localStorage.getItem('token');
					this.token && this._cartService.getCart().subscribe();
				}),
			);
	}

	logout() {
		localStorage.removeItem('token');
		this.authState.next(false);
		this._cartService.clearCart();
		this._router.navigate(['/']);
	}

	getToken() {
		return this.token || localStorage.getItem('token');
	}

	isAuthenticated(): boolean {
		const token = this.getToken();
		return token ? !this._jwtHelper.isTokenExpired(token) : false;
	}

	getAuthState() {
		return this.authState.asObservable();
	}
}
