import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CLIENT_ROUTES } from 'app/app.routes';
import { MaterialModule } from 'app/material.module';

@Component({
	selector: 'app-my-profile',
	standalone: true,
	imports: [MaterialModule],
	templateUrl: './my-profile.component.html',
	styleUrl: './my-profile.component.scss',
})
export class MyProfileComponent {
	constructor(private _router: Router) {}

	goToMyProfile() {
		this._router.navigateByUrl(CLIENT_ROUTES.BASIC_INFO);
	}

	goToMyOrders() {
		this._router.navigateByUrl(CLIENT_ROUTES.MY_ORDERS);
	}

	goToMyAddresses() {
		this._router.navigateByUrl(CLIENT_ROUTES.MY_ADDRESSES);
	}

	goToWishList() {
		this._router.navigateByUrl(CLIENT_ROUTES.WISHLIST);
	}
}
