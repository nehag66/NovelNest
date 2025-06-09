import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { ApiService } from './api.service';
import { ProfileResponse } from 'app/models/profile';
import { AuthorResponse, AuthorSummary } from 'app/models/author';
import { Category, CategoryResponse } from 'app/models/novels';

@Injectable({
	providedIn: 'root',
})
export class CacheService {
	userId: string | null = '';

	constructor(
		private _storageService: StorageService,
		private _apiService: ApiService,
	) {
		this.userId = this._storageService.get<string>('userId');
	}

	cacheUserInfo() {
		const userInfo = this._storageService.get('userInfo');
		if (!userInfo) {
			this._apiService
				.get<{
					message: string;
					user: ProfileResponse;
				}>(`users/${this.userId}`)
				.subscribe(
					(userInfo: { message: string; user: ProfileResponse }) => {
						this._storageService.set('userInfo', userInfo.user);
					},
				);
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
}
