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

	get bearerToken() {
		return this.token || localStorage.getItem('token');
	}

	register(user: any) {
		return this._apiService.post(`auth/register`, user);
	}

	login(credentials: any) {
		return this._apiService
			.post<{ token: string }>(`auth/login`, credentials, false)
			.pipe(
				tap((res) => {
					this.token = res.token;
				}),
			);
	}

	logout() {
		this._cartService.clearCart().subscribe((res) => {
			localStorage.removeItem('token');
			this.authState.next(false);
			this._router.navigate(['/']);
		});
	}

	isAuthenticated(): boolean {
		const token = this.bearerToken;
		return token ? !this._jwtHelper.isTokenExpired(token) : false;
	}

	getAuthState() {
		return this.authState.asObservable();
	}
}
