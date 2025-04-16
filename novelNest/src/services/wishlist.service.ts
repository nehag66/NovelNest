import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class WishlistService {
	constructor(private _apiService: ApiService) {}

	getWishlist(): Observable<any> {
		return this._apiService.get('wishlist');
	}

	addToWishlist(novelId: string): Observable<any> {
		return this._apiService.post('wishlist/add', { novelId });
	}

	removeFromWishlist(novelId: string): Observable<any> {
		return this._apiService.post('wishlist/remove', { novelId });
	}
}
