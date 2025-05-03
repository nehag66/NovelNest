import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CLIENT_ROUTES } from 'app/app.routes';
import { LoginSignupDialogComponent } from 'app/login/login-signup-dialog/login-signup-dialog.component';
import { MaterialModule } from 'app/material.module';
import { AuthService } from 'services/auth.service';
import { CartService } from 'services/cart.service';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [MaterialModule, CommonModule],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
})
export class HeaderComponent {
	cartCount = 0;
	cartItems: any;
	isLoggedIn: string | null = null;

	constructor(
		private _dialog: MatDialog,
		private _router: Router,
		private _cartService: CartService,
		private _authService: AuthService,
	) {
		this.isLoggedIn = this._authService.bearerToken;
		this.updateCartCount();
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

	goToCart() {
		this._router.navigate([CLIENT_ROUTES.MY_CART]);
	}

	goToMyOrders() {
		this._router.navigate([CLIENT_ROUTES.MY_ORDERS]);
	}

	goToSellUsedBooks() {
		this._router.navigate([CLIENT_ROUTES.SELL_USED_BOOKS]);
	}

	goToBuyBooks() {
		this._router.navigate([CLIENT_ROUTES.ALL_BOOKS]);
	}

	goToWishList() {
		this._router.navigate([CLIENT_ROUTES.WISHLIST]);
	}

	goToProfile() {
		this._router.navigate([CLIENT_ROUTES.PROFILE_DETAILS]);
	}

	goToMainPage() {
		this._router.navigate([CLIENT_ROUTES.MAIN_PAGE]);
	}

	onLogout() {
		if (this.cartCount > 0) {
			this._cartService.clearCart().subscribe(() => {
				this._authService.logout();
			});
		} else this._authService.logout();
	}
}
