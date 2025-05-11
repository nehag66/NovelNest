import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
	providedIn: 'root',
})
export class SearchService {
	constructor(private _apiService: ApiService) {}

	searchBooks(query: string): Observable<any[]> {
		return this._apiService.get<any[]>(`search?query=${query}`);
	}
}
