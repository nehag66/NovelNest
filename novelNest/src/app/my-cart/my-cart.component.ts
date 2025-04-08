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
	selectedNovels: any[] = [];

	constructor(
		private _dialog: MatDialog,
		private _router: Router,
		private _cartService: CartService,
	) {}

	ngOnInit(): void {
		this.updateCartItems();
		this.updateCartCount();
	}

	isSelected(novel: any): boolean {
		return this.selectedNovels.some((item) => item.novelId._id === novel.novelId._id);
	}	

	toggleSelection(novel: any) {
		const index = this.selectedNovels.findIndex(
			(item) => item.novelId._id === novel.novelId._id,
		);
		if (index > -1) {
			this.selectedNovels.splice(index, 1); // Remove if already selected
		} else {
			this.selectedNovels.push(novel); // Add if not selected
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

	isLoggedIn(): boolean {
		return !!localStorage.getItem('accessToken');
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
		this._cartService.updateCartQuantity(novel, novel.quantity + 1);
	}

	decreaseQuantity(novel: NovelResponse) {
		this._cartService.updateCartQuantity(novel, novel.quantity - 1);
	}

	buyNow() {
		this._router.navigate([CLIENT_ROUTES.BUY_BOOKS], {
			state: { selectedNovels: this.selectedNovels },
		});
	}
}
