import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CLIENT_ROUTES } from 'app/app.routes';
import { LoginSignupDialogComponent } from 'app/login/login-signup-dialog/login-signup-dialog.component';
import { MaterialModule } from 'app/material.module';
import { Novel, NovelResponse } from 'app/models/novels';
import { CartService } from 'services/cart.service';
import { CONSTANTS } from 'shared/constants';
import { SharedModule } from 'shared/shared.module';

@Component({
	selector: 'my-cart',
	standalone: true,
	imports: [MaterialModule, SharedModule],
	templateUrl: './my-cart.component.html',
	styleUrl: './my-cart.component.scss',
})
export class MyCartComponent implements OnInit {
	cartItems: any;
	cartCount: number = 0;

	constructor(
		private _dialog: MatDialog,
		private _router: Router,
		private _cartService: CartService,
	) {}

	ngOnInit(): void {
		this._cartService.cartItems$.subscribe((items: any) => {
			this.cartItems = items.map((item: any) => ({
				...item,
				novelId: {
					...item.novelId,
					images: item.novelId?.images.map(
						(img: string) => `${CONSTANTS.IMAGE_URL}${img}`,
					),
				},
			}));
		});
		this.updateCartCount();
	}

	updateCartCount() {
		this._cartService.cartItemCount$.subscribe((count) => {
			this.cartCount = count;
		});
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

	increaseQuantity(novel: NovelResponse) {
		this._cartService
			.updateCartQuantity(novel._id, novel.quantity + 1)
			.subscribe();
	}

	decreaseQuantity(novel: NovelResponse) {
		if (novel.quantity > 1) {
			this._cartService
				.updateCartQuantity(novel._id, novel.quantity - 1)
				.subscribe();
		} else {
			this._cartService.removeFromCart(novel._id).subscribe();
		}
	}

	buyNow() {
		this._router.navigate([CLIENT_ROUTES.BUY_BOOKS]);
	}
}
