import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CLIENT_ROUTES } from 'app/app.routes';
import { LoginSignupDialogComponent } from 'app/login/login-signup-dialog/login-signup-dialog.component';
import { MaterialModule } from 'app/material.module';
import { Novel } from 'app/models/novels';
import { Observable } from 'rxjs';
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
	cartItems$: Observable<Novel[]> | undefined;
	isLoggedIn = true;
	cartCount = 0;

	constructor(
		private _dialog: MatDialog,
		private _router: Router,
		private _cartService: CartService,
	) {}

	ngOnInit(): void {
		this._cartService.cartCount$.subscribe((count) => {
			this.cartCount = count;
		});
		this.cartItems$ = this._cartService.getCartItems();
	}

	openLoginDialog(e: Event) {
		e.preventDefault();
		const dialogRef = this._dialog.open(LoginSignupDialogComponent, {
			width: '400px',
			height: '300px',
			maxWidth: '80vw',
			minWidth: '200px',
		});
		dialogRef.afterClosed().subscribe((result) => {});
	}

	goToBuyBooks() {
		this._router.navigate([CLIENT_ROUTES.BUY_BOOKS]);
	}

	goToNovelDetails(novelId: string) {
		this._router.navigate([CLIENT_ROUTES.NOVEL, novelId]);
	}

	removeNovelFromCart(i: number) {
		this._cartService.removeFromCart(i);
	}
}
