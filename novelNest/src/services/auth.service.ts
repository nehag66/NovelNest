import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

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
	) {}

	get bearerToken() {
		return this.accessToken || localStorage.getItem('accessToken');
	}

	register(user: any) {
		return this._apiService.post(`auth/register`, user);
	}

	refreshToken(): Observable<{ token: string }> {
		const refreshToken = localStorage.getItem('refreshToken');
		if (!refreshToken) {
			return throwError(() => new Error('No refresh token found'));
		}

		return this._apiService.post<{ token: string }>(
			'auth/refresh-token',
			{ refreshToken },
			false,
		);
	}

	login(credentials: any) {
		return this._apiService
			.post<{
				accessToken: string;
				refreshToken: string;
				userId: string;
			}>(`auth/login`, credentials, false)
			.pipe(
				tap((res) => {
					localStorage.setItem('accessToken', res.accessToken);
					localStorage.setItem('refreshToken', res.refreshToken);
					localStorage.setItem('userId', res.userId);
					this.accessToken = res.accessToken;
				}),
			);
	}

	logout() {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		localStorage.removeItem('userId');
		this.authState.next(false);
		this._router.navigate(['/']);
	}

	isAuthenticated(): boolean {
		const accessToken = this.bearerToken;
		const refreshToken = localStorage.getItem('refreshToken');
		if (accessToken && !this._jwtHelper.isTokenExpired(accessToken)) {
			return true;
		}
		// If accessToken is expired but refreshToken exists
		if (refreshToken && !this._jwtHelper.isTokenExpired(refreshToken)) {
			return true;
		}
		return false;
	}

	getAuthState() {
		return this.authState.asObservable();
	}
}
