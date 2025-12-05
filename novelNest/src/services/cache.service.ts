import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { ApiService } from './api.service';
import { ProfileResponse } from 'app/models/profile';
import { AuthorResponse, AuthorSummary } from 'app/models/author';
import { Category, CategoryResponse } from 'app/models/novel';

@Injectable({
	providedIn: 'root',
})
export class CacheService {
	constructor(
		private _storageService: StorageService,
		private _apiService: ApiService,
	) {}

	private get userId(): string | null {
		const storedUserId = this._storageService.get<string>('userId');
		return storedUserId && storedUserId !== 'null' ? storedUserId : null;
	}

	cacheUserInfo() {
		const userInfo = this._storageService.get('userInfo');
		const userId = this.userId;

		if (!userInfo && userId) {
			this._apiService
				.get<{
					message: string;
					user: ProfileResponse;
				}>(`users/${userId}`)
				.subscribe((userInfo) => {
					this._storageService.set('userInfo', userInfo.user);
				});
		}
	}

	cacheAuthors() {
		const authors = this._storageService.get('authors');
		if (!authors || (Array.isArray(authors) && authors.length === 0)) {
			this._apiService
				.get<{
					message: string;
					authors: AuthorSummary[];
				}>('authors')
				.subscribe((authors: AuthorResponse) => {
					this._storageService.set('authors', authors.authors);
				});
		}
	}

	cacheCategories() {
		const categories = this._storageService.get('categories');
		if (
			!categories ||
			(Array.isArray(categories) && categories.length === 0)
		) {
			this._apiService
				.get<{
					message: string;
					categories: Category[];
				}>('categories')
				.subscribe((categories: CategoryResponse) => {
					this._storageService.set(
						'categories',
						categories.categories,
					);
				});
		}
	}

	clearCache() {
		try {
			this._storageService.remove('userId');
			this._storageService.remove('userInfo');
		} catch (err) {
			console.warn('Error clearing cache', err);
		}
	}
}
