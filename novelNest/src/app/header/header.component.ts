import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CLIENT_ROUTES } from 'app/app.routes';
import { LoginSignupDialogComponent } from 'app/login/login-signup-dialog/login-signup-dialog.component';
import { MaterialModule } from 'app/material.module';
import {
	Subject,
	debounceTime,
	distinctUntilChanged,
	takeUntil,
	switchMap,
	tap,
	of,
	catchError,
} from 'rxjs';
import { AuthService } from 'services/auth.service';
import { CartService } from 'services/cart.service';
import { SearchService } from 'services/search.service';
import { StorageService } from 'services/storage.service';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [MaterialModule, CommonModule],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
	private destroy$ = new Subject<void>();

	// UI state
	cartCount = 0;
	cartItems: any;
	isLoggedIn = false;
	userInfo: any;

	// Search
	searchTerm = '';
	results: any[] = [];
	private searchSubject = new Subject<string>();

	constructor(
		private _dialog: MatDialog,
		private _router: Router,
		private _cartService: CartService,
		private _authService: AuthService,
		private _searchService: SearchService,
		private _route: ActivatedRoute,
		private _storageService: StorageService,
	) {}

	ngOnInit() {
		// initialize userInfo & auth state
		this.userInfo = this._storageService.get('userInfo');
		this._authService
			.getAuthState()
			.pipe(
				takeUntil(this.destroy$),
				tap((state) => {
					this.isLoggedIn = state;
					this.userInfo = state
						? this._storageService.get('userInfo')
						: null;
				}),
			)
			.subscribe();

		// cart count
		this._cartService.cartItemCount$
			.pipe(
				takeUntil(this.destroy$),
				tap((count) => (this.cartCount = count || 0)),
			)
			.subscribe();

		// route query param -> populate searchTerm (keeps URL <-> input in sync)
		this._route.queryParams
			.pipe(
				takeUntil(this.destroy$),
				tap((params) => {
					this.searchTerm = params['search'] || '';
				}),
			)
			.subscribe();

		// setup search stream (debounce, avoid duplicate searches)
		this.searchSubject
			.pipe(
				takeUntil(this.destroy$),
				// wait for user to stop typing
				debounceTime(300),
				distinctUntilChanged(),
				// trim and only proceed if non-empty
				switchMap((term: string) => {
					const trimmed = term.trim();
					if (!trimmed) {
						this.results = [];
						// navigate to list page with empty search? we keep it simple and do nothing
						return of([]);
					}
					return this._searchService.searchBooks(trimmed).pipe(
						catchError((err) => {
							console.error('Search error', err);
							return of([]); // treat error as no results to avoid breaking the stream
						}),
					);
				}),
				tap((data: any[]) => {
					this.results = data || [];
					if ((data || []).length > 0) {
						// keep the UI route in sync
						this._router.navigate([CLIENT_ROUTES.NOVEL_LIST], {
							queryParams: { search: this.searchTerm.trim() },
						});
					} else {
						this._router.navigateByUrl(
							CLIENT_ROUTES.NO_RESULTS_FOUND,
						);
					}
				}),
			)
			.subscribe();
	}

	// called from template on (input) or (ngModelChange)
	onSearchInput(term: string) {
		this.searchTerm = term;
		this.searchSubject.next(term);
	}

	// legacy method kept for immediate search trigger (e.g., button click)
	onSearch() {
		// delegate to searchSubject pipeline for consistent behavior
		this.searchSubject.next(this.searchTerm);
	}

	showManageMenu() {
		return this.userInfo?.role === 'superadmin';
	}

	openLoginSignup() {
		const dialogRef = this._dialog.open(LoginSignupDialogComponent, {
			width: '400px',
			height: '350px',
			maxWidth: '80vw',
			minWidth: '200px',
			panelClass: 'custom-dialog',
		});

		// when dialog closes, re-check storage in case login/register happened
		dialogRef
			.afterClosed()
			.pipe(
				takeUntil(this.destroy$),
				tap(() => {
					this.userInfo = this._storageService.get('userInfo');
				}),
			)
			.subscribe();
	}

	goToCart() {
		this._router.navigateByUrl(CLIENT_ROUTES.MY_CART);
	}

	goToMyOrders() {
		this._router.navigateByUrl(CLIENT_ROUTES.MY_ORDERS);
	}

	goToSellingOrders() {
		this._router.navigateByUrl(CLIENT_ROUTES.SELLING_ORDERS);
	}

	goToSellUsedBooks() {
		this._router.navigateByUrl(CLIENT_ROUTES.SELL_USED_BOOKS);
	}

	goToBuyBooks() {
		this._router.navigate([CLIENT_ROUTES.NOVEL_LIST]);
	}

	goToWishList() {
		this._router.navigateByUrl(CLIENT_ROUTES.WISHLIST);
	}

	goToProfile() {
		this._router.navigateByUrl(CLIENT_ROUTES.PROFILE_DETAILS);
	}

	goToAdminHandlesPage() {
		this._router.navigateByUrl(CLIENT_ROUTES.ADMIN_HANDLE);
	}

	goToMainPage() {
		this._router.navigateByUrl(CLIENT_ROUTES.MAIN_PAGE);
	}

	onLogout() {
		if (this.cartCount > 0) {
			// wait for the clearCart observable to complete, then logout
			this._cartService
				.clearCart()
				.pipe(
					takeUntil(this.destroy$),
					tap(() => this._authService.logout()),
				)
				.subscribe({
					error: (err) => {
						console.error(
							'Failed to clear cart before logout',
							err,
						);
						// fallback: still logout
						this._authService.logout();
					},
				});
		} else {
			this._authService.logout();
		}
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
