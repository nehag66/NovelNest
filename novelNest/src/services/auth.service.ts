import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from './api.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	// private apiUrl = `${CONSTANTS.BASE_URL}/auth`;
	private authState = new BehaviorSubject<boolean>(this.isAuthenticated());

	constructor(
		private _jwtHelper: JwtHelperService,
		private _apiService: ApiService,
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
