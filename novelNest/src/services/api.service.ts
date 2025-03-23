import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { CONSTANTS } from 'shared/constants';

@Injectable({
	providedIn: 'root',
})
export class ApiService {

	constructor(private http: HttpClient) {}

	private handleError(error: any) {
		console.error('An error occurred:', error); // Log the error for now
		return throwError(
			() => new Error('Something went wrong; please try again later.'),
		);
	}

	get<T>(endpoint: string, params?: any): Observable<T> {
		return this.http
			.get<T>(`${CONSTANTS.BASE_URL}/${endpoint}`, { params })
			.pipe(catchError(this.handleError));
	}

	// POST method
	post<T>(endpoint: string, body: any): Observable<T> {
		return this.http.post<T>(`${CONSTANTS.BASE_URL}/${endpoint}`, body);
	}

	// PUT method
	put<T>(endpoint: string, body: any): Observable<T> {
		return this.http.put<T>(`${CONSTANTS.BASE_URL}/${endpoint}`, body);
	}

	// DELETE method
	delete<T>(endpoint: string): Observable<T> {
		return this.http.delete<T>(`${CONSTANTS.BASE_URL}/${endpoint}`);
	}

	// PATCH method (optional)
	patch<T>(endpoint: string, body: any): Observable<T> {
		return this.http.patch<T>(`${CONSTANTS.BASE_URL}/${endpoint}`, body);
	}
}
