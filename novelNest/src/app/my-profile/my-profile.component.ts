import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CLIENT_ROUTES } from 'app/app.routes';
import { MaterialModule } from 'app/material.module';
import { AddCategoryDialogComponent } from './add-category-dialog/add-category-dialog.component';
import { StorageService } from 'services/storage.service';
import { CommonModule } from '@angular/common';
import { UserInfo } from 'app/models/user';
import { AddAuthorDialogComponent } from './add-author-dialog/add-author-dialog.component';

@Component({
	selector: 'app-my-profile',
	standalone: true,
	imports: [MaterialModule, CommonModule],
	templateUrl: './my-profile.component.html',
	styleUrl: './my-profile.component.scss',
})
export class MyProfileComponent implements OnInit {
	userInfo: UserInfo | null = {
		name: '',
		email: '',
		addresses: [],
		role: '',
	};

	constructor(
		private _router: Router,
		private _dialogService: MatDialog,
		private _storageService: StorageService,
	) {}

	ngOnInit(): void {
		this.userInfo = this._storageService.get('userInfo');
	}

	addCategoryDialog() {
		const dialogRef = this._dialogService.open(AddCategoryDialogComponent, {
			width: '400px',
			height: '350px',
			maxWidth: '80vw',
			minWidth: '200px',
			panelClass: 'custom-dialog',
		});
		dialogRef.afterClosed().subscribe();
	}

	addAuthorDialog() {
		const dialogRef = this._dialogService.open(AddAuthorDialogComponent, {
			width: '400px',
			height: '350px',
			maxWidth: '80vw',
			minWidth: '200px',
			panelClass: 'custom-dialog',
		});
		dialogRef.afterClosed().subscribe();
	}

	goToMyProfile() {
		this._router.navigateByUrl(CLIENT_ROUTES.BASIC_INFO);
	}

	goToMyOrders() {
		this._router.navigateByUrl(CLIENT_ROUTES.MY_ORDERS);
	}

	goToSellingOrders() {
		this._router.navigateByUrl(CLIENT_ROUTES.SELLING_ORDERS);
	}

	goToMyAddresses() {
		this._router.navigateByUrl(CLIENT_ROUTES.MY_ADDRESSES);
	}

	goToWishList() {
		this._router.navigateByUrl(CLIENT_ROUTES.WISHLIST);
	}
}
