import {
	HttpRequest,
	HttpEvent,
	HttpHandlerFn,
	HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from 'services/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (
	req: HttpRequest<any>,
	next: HttpHandlerFn,
): Observable<HttpEvent<any>> => {
	const authService = inject(AuthService);
	const accessToken = localStorage.getItem('accessToken');

	let authReq = req;
	if (accessToken) {
		authReq = req.clone({
			setHeaders: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
	}

	return next(authReq).pipe(
		catchError((err: any) => {
			if (err.status === 401 && err.error?.message === 'Invalid token!') {
				return authService.refreshToken().pipe(
					switchMap((tokens: any) => {
						localStorage.setItem('accessToken', tokens.accessToken);
						const retryReq = req.clone({
							setHeaders: {
								Authorization: `Bearer ${tokens.accessToken}`,
							},
						});
						return next(retryReq);
					}),
					catchError(() => {
						authService.logout();
						return throwError(() => err);
					}),
				);
			}
			return throwError(() => err);
		}),
	);
};
