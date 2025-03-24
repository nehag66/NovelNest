import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CLIENT_ROUTES } from 'app/app.routes';
import { LoginSignupDialogComponent } from 'app/login/login-signup-dialog/login-signup-dialog.component';
import { MaterialModule } from 'app/material.module';
import { Novel } from 'app/models/novels';
import { CartService } from 'services/cart.service';
import { SharedModule } from 'shared/shared.module';

@Component({
	selector: 'my-cart',
	standalone: true,
	imports: [MaterialModule, SharedModule],
	templateUrl: './my-cart.component.html',
	styleUrl: './my-cart.component.scss',
})
export class MyCartComponent implements OnInit {
	token: string = '';
cartItems: any;
	// cartItems: Novel[] = [];
	cartCount: number = 0;

	constructor(
		private _dialog: MatDialog,
		private _router: Router,
		private _cartService: CartService,
	) {}

	ngOnInit(): void {
		// localStorage.getItem('token')
		this._cartService.getCart().subscribe((items) => {
			this.cartItems = items;
		});

		/* this._cartService.cartItemCount$.subscribe((count) => {
			this.cartCount = count;
		}); */
	}

	isLoggedIn(): boolean {
		return !!localStorage.getItem('token');
	}

	openLoginDialog(e: Event) {
		e.preventDefault();
		const dialogRef = this._dialog.open(LoginSignupDialogComponent, {
			width: '400px',
			height: '350px',
			maxWidth: '80vw',
			minWidth: '200px',
			panelClass: 'custom-dialog',
		});
		dialogRef.afterClosed().subscribe((result) => {});
	}

	goToBuyBooks() {
		this._router.navigate([CLIENT_ROUTES.ALL_BOOKS]);
	}

	goToNovelDetails(novelId: string) {
		this._router.navigate([CLIENT_ROUTES.NOVEL, novelId]);
	}

	buyBtnDisabled(novel: Novel) {
		if (!novel.quantity) return false;
		return novel.quantity && novel.totalQuantity <= novel.quantity;
	}

	increaseQuantity(novelId: string) {
		this._cartService.addToCart(novelId);
	}

	decreaseQuantity(novel: Novel) {
		/* if (novel.quantity > 1) {
			this._cartService.updateCartQuantity(novel, novel.quantity - 1);
		} else {
			this._cartService.removeFromCart(novel);
		} */
	}

	/* removeNovelFromCart(novel: Novel) {
		this._cartService.removeFromCart(novel);
	} */

	buyNow() {
		this._router.navigate([CLIENT_ROUTES.BUY_BOOKS]);
	}
}
