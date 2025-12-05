import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { CacheService } from './cache.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	loginStatusChanged = new Subject<void>();
	private authState = new BehaviorSubject<boolean>(false);
	accessToken: string | null = null;

	constructor(
		private _jwtHelper: JwtHelperService,
		private _apiService: ApiService,
		private _router: Router,
		private _storageService: StorageService,
		private _cacheService: CacheService,
	) {
		this.authState.next(this.isAuthenticated());
	}

	get bearerToken(): string | null {
		const token =
			this.accessToken || this._storageService.get('accessToken');
		return token || null;
	}

	refreshToken(): Observable<{ accessToken: string }> {
		const refreshToken = this._storageService.get('refreshToken');
		if (!refreshToken) {
			return throwError(() => new Error('No refresh token found'));
		}

		return this._apiService
			.post<{
				accessToken: string;
			}>('auth/refresh-token', { refreshToken }, false)
			.pipe(
				tap((res) => {
					this._storageService.set('accessToken', res.accessToken);
					this.accessToken = res.accessToken;
				}),
			);
	}

	register(user: any) {
		return this._apiService.post(`auth/register`, user).pipe(
			tap((res: any) => {
				this._storageService.set('accessToken', res.accessToken);
				this._storageService.set('refreshToken', res.refreshToken);
				this._storageService.set('userId', res.userId);
				this._cacheService.cacheUserInfo();
				this.accessToken = res.accessToken;
				this.authState.next(true);
			}),
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
					this._storageService.set('accessToken', res.accessToken);
					this._storageService.set('refreshToken', res.refreshToken);
					this._storageService.set('userId', res.userId);
					this._cacheService.cacheUserInfo();
					this.accessToken = res.accessToken;
					this.authState.next(true);
				}),
			);
	}

	notifyLoginSuccess() {
		this.loginStatusChanged.next();
	}

	sendResetLink(email: string) {
		return this._apiService.post<{ msg: string }>('auth/forgot-password', {
			email,
		});
	}

	resetPassword(token: string, password: string) {
		return this._apiService.post<{ msg: string }>(
			`auth/reset-password/${token}`,
			{ password },
		);
	}

	logout() {
		this.accessToken = null;
		this._storageService.remove('accessToken');
		this._storageService.remove('refreshToken');
		this._storageService.remove('userId');
		this._storageService.remove('userInfo');
		// Clear any CacheService in-memory caches if implemented
		if (
			this._cacheService &&
			typeof this._cacheService.clearCache === 'function'
		) {
			this._cacheService.clearCache();
		}
		this.authState.next(false);
		this._router.navigateByUrl('/');
	}

	isAuthenticated(): boolean {
		let refreshToken: string | null = '';
		const accessToken = this.bearerToken;
		refreshToken = this._storageService.get('refreshToken');
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
