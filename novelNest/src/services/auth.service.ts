import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { CartService } from './cart.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private authState = new BehaviorSubject<boolean>(this.isAuthenticated());
	accessToken: string | null = null;

	constructor(
		private _jwtHelper: JwtHelperService,
		private _apiService: ApiService,
		private _router: Router,
		private _cartService: CartService,
	) {}

	get bearerToken() {
		return this.accessToken || localStorage.getItem('accessToken');
	}

	register(user: any) {
		return this._apiService.post(`auth/register`, user);
	}

	refreshToken(): Observable<any> {
		const refreshToken = localStorage.getItem('refreshToken');
		return this._apiService.post<any>('/auth/refresh-token', {
			refreshToken,
		});
	}

	login(credentials: any) {
		return this._apiService
			.post<{
				accessToken: string;
				refreshToken: string;
			}>(`auth/login`, credentials, false)
			.pipe(
				tap((res) => {
					localStorage.setItem('accessToken', res.accessToken);
					localStorage.setItem('refreshToken', res.refreshToken);
					this.accessToken = res.accessToken;
				}),
			);
	}

	logout() {
		this._cartService.clearCart().subscribe((res) => {
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
			this.authState.next(false);
			this._router.navigate(['/']);
		});
	}

	isAuthenticated(): boolean {
		const accessToken = this.bearerToken;
		return accessToken
			? !this._jwtHelper.isTokenExpired(accessToken)
			: false;
	}

	getAuthState() {
		return this.authState.asObservable();
	}
}
