import { Injectable } from '@angular/core';
import lscache from 'lscache';

@Injectable({
	providedIn: 'root',
})
export class StorageService {
	private readonly DEFAULT_EXPIRY_MINUTES = 60 * 24 * 7; // 7 days

	set<T>(
		key: string,
		value: T,
		expiryMinutes: number = this.DEFAULT_EXPIRY_MINUTES,
	): void {
		lscache.set(key, value, expiryMinutes);
	}

	get<T>(key: string): T | null {
		return lscache.get(key);
	}

	remove(key: string): void {
		lscache.remove(key);
	}

	flush(): void {
		lscache.flush(); // removes all lscache items
	}

	flushExpired(): void {
		lscache.flushExpired(); // removes expired items
	}
}
