import {
	HttpInterceptor,
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from 'services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor(private authService: AuthService) {}
	intercept(
		req: HttpRequest<any>,
		next: HttpHandler,
	): Observable<HttpEvent<any>> {
		const accessToken = localStorage.getItem('accessToken');

		let authReq = req;
		if (accessToken) {
			authReq = req.clone({
				setHeaders: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
		}

		return next.handle(authReq).pipe(
			catchError((err: HttpErrorResponse) => {
				if (
					err.status === 401 &&
					err.error?.message === 'jwt expired'
				) {
					return this.authService.refreshToken().pipe(
						switchMap((tokens: any) => {
							localStorage.setItem('accessToken', tokens.token);
							// Retry original request
							const retryReq = req.clone({
								setHeaders: {
									Authorization: `Bearer ${tokens.token}`,
								},
							});
							return next.handle(retryReq);
						}),
						catchError(() => {
							this.authService.logout();
							return throwError(() => err);
						}),
					);
				}
				return throwError(() => err);
			}),
		);
	}
}
