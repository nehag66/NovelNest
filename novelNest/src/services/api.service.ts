import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { CONSTANTS } from 'shared/constants';

@Injectable({
	providedIn: 'root',
})
export class ApiService {
	constructor(private http: HttpClient) {}

	get bearerToken() {
		return localStorage.getItem('token');
	}

	private handleError(error: any) {
		console.error('An error occurred:', error); // Log the error for now
		return throwError(
			() => new Error('Something went wrong; please try again later.'),
		);
	}

	get<T>(endpoint: string, params?: any): Observable<T> {
		const headers = new HttpHeaders({
			Authorization: `Bearer ${this.bearerToken}`, // Get token from localStorage
		});

		return this.http
			.get<T>(`${CONSTANTS.BASE_URL}/${endpoint}`, { params, headers }) // Pass headers
			.pipe(catchError(this.handleError));
	}

	post<T>(
		endpoint: string,
		body: any,
		requiresAuth: boolean = true,
	): Observable<T> {
		let headers = new HttpHeaders();

		if (requiresAuth && this.bearerToken) {
			headers = headers.set(
				'Authorization',
				`Bearer ${this.bearerToken}`,
			);
		}

		return this.http
			.post<T>(`${CONSTANTS.BASE_URL}/${endpoint}`, body, { headers })
			.pipe(catchError(this.handleError));
	}

	// PUT method
	put<T>(endpoint: string, body: any): Observable<T> {
		const headers = new HttpHeaders({
			Authorization: `Bearer ${this.bearerToken}`,
		});

		return this.http.put<T>(`${CONSTANTS.BASE_URL}/${endpoint}`, body, {
			headers,
		});
	}

	// DELETE method
	delete<T>(endpoint: string, body?: any): Observable<T> {
		const headers = new HttpHeaders({
			Authorization: `Bearer ${this.bearerToken}`,
		});
	
		return this.http.request<T>('DELETE', `${CONSTANTS.BASE_URL}/${endpoint}`, {
			headers,
			body, // Explicitly set body
		});
	}

	// PATCH method (optional)
	patch<T>(endpoint: string, body: any): Observable<T> {
		const headers = new HttpHeaders({
			Authorization: `Bearer ${this.bearerToken}`,
		});
		return this.http.patch<T>(`${CONSTANTS.BASE_URL}/${endpoint}`, body, {
			headers,
		});
	}
}
