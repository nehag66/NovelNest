import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CLIENT_ROUTES } from 'app/app.routes';
import { LoginSignupDialogComponent } from 'app/login/login-signup-dialog/login-signup-dialog.component';
import { MaterialModule } from 'app/material.module';
import { Subject } from 'rxjs';
import { AuthService } from 'services/auth.service';
import { CartService } from 'services/cart.service';
import { SearchService } from 'services/search.service';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [MaterialModule, CommonModule],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
	private destroy$ = new Subject<void>();
	cartCount = 0;
	cartItems: any;
	isLoggedIn = false;

	searchTerm = '';
	results: any[] = [];

	constructor(
		private _dialog: MatDialog,
		private _router: Router,
		private _cartService: CartService,
		private _authService: AuthService,
		private _searchService: SearchService,
		private _route: ActivatedRoute,
	) {
		this._authService.getAuthState().subscribe((state) => {
			this.isLoggedIn = state;
		});
		this.updateCartCount();
	}

	ngOnInit() {
		this._route.queryParams.subscribe((params) => {
			this.searchTerm = params['search'] || ''; // Safely fallback to empty string
		});
	}

	updateCartCount() {
		this._cartService.cartItemCount$.subscribe((count) => {
			this.cartCount = count;
		});
	}

	openLoginSignup() {
		const dialogRef = this._dialog.open(LoginSignupDialogComponent, {
			width: '400px',
			height: '350px',
			maxWidth: '80vw',
			minWidth: '200px',
			panelClass: 'custom-dialog',
		});

		dialogRef.afterClosed().subscribe();
	}

	onSearch() {
		const trimmedTerm = this.searchTerm.trim();
		if (trimmedTerm) {
			this._searchService.searchBooks(this.searchTerm).subscribe(
				(data) => {
					this.results = data;

					if (data.length > 0) {
						// Redirect to the novel list page and pass the search results or searchTerm
						this._router.navigate([CLIENT_ROUTES.NOVEL_LIST], {
							queryParams: { search: trimmedTerm },
						});
					} else {
						// Navigate to No Results found page
						this._router.navigateByUrl(
							CLIENT_ROUTES.NO_RESULTS_FOUND,
						);
					}
				},
				(error) => {
					console.error('Error during search:', error);
				},
			);
		} else {
			this.results = [];
		}
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

	goToMainPage() {
		this._router.navigateByUrl(CLIENT_ROUTES.MAIN_PAGE);
	}

	onLogout() {
		if (this.cartCount > 0) {
			this._cartService.clearCart().subscribe(() => {
				this._authService.logout();
			});
		} else this._authService.logout();
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
