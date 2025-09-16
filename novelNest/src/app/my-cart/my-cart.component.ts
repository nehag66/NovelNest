import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CLIENT_ROUTES } from 'app/app.routes';
import { LoginSignupDialogComponent } from 'app/login/login-signup-dialog/login-signup-dialog.component';
import { MaterialModule } from 'app/material.module';
import { CartResponse } from 'app/models/novel';
import { AuthService } from 'services/auth.service';
import { CartService } from 'services/cart.service';
import { CONSTANTS } from 'shared/constants';
import { SharedModule } from 'shared/shared.module';

@Component({
	selector: 'app-my-cart',
	standalone: true,
	imports: [MaterialModule, SharedModule],
	templateUrl: './my-cart.component.html',
	styleUrl: './my-cart.component.scss',
})
export class MyCartComponent implements OnInit {
	cartItems: any;
	cartCount = 0;
	selectedNovels: any[] = [];
	isLoggedIn: string | null = null;

	constructor(
		private _dialog: MatDialog,
		private _router: Router,
		private _cartService: CartService,
		private _authService: AuthService,
	) {}

	ngOnInit(): void {
		this.isLoggedIn = this._authService.bearerToken;
		this.updateCartItems();
		this.updateCartCount();
	}

	isSelected(novel: any): boolean {
		return this.selectedNovels.some(
			(item) => item.novelId._id === novel.novelId._id,
		);
	}

	toggleSelection(novel: any) {
		const index = this.selectedNovels.findIndex(
			(item) => item.novelId._id === novel.novelId._id,
		);
		if (index > -1) {
			this.selectedNovels.splice(index, 1);
		} else {
			this.selectedNovels.push(novel);
		}
	}

	updateCartItems() {
		this._cartService.cartItems$.subscribe((items: any) => {
			if (!items) return;
			this.cartItems = items.map((item: any) => ({
				...item,
				novelId: {
					...item.novelId,
					images:
						item.novelId?.images?.map(
							(img: string) => `${CONSTANTS.IMAGE_URL}${img}`,
						) || [],
				},
			}));
		});
	}

	updateCartCount() {
		this._cartService.cartItemCount$.subscribe((count) => {
			this.cartCount = count;
		});
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
		dialogRef.afterClosed().subscribe();
	}

	goToBuyBooks() {
		this._router.navigateByUrl(CLIENT_ROUTES.NOVEL_LIST);
	}

	buyBtnDisabled(novel: CartResponse) {
		if (!novel.quantity) return false;
		return novel.quantity && novel.novelId.totalQuantity <= novel.quantity;
	}

	increaseQuantity(novel: CartResponse) {
		this._cartService.updateCartQuantity(novel, novel.quantity + 1);
	}

	decreaseQuantity(novel: CartResponse) {
		this._cartService.updateCartQuantity(novel, novel.quantity - 1);
	}

	buyNow() {
		this._router.navigate([CLIENT_ROUTES.BUY_BOOKS], {
			state: { selectedNovels: this.selectedNovels },
		});
	}
}
