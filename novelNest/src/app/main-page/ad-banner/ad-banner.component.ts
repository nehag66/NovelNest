import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { Router } from '@angular/router';
import { CLIENT_ROUTES } from '../../app.routes';

@Component({
	selector: 'app-ad-banner',
	standalone: true,
	imports: [MaterialModule],
	templateUrl: './ad-banner.component.html',
	styleUrl: './ad-banner.component.scss',
})
export class AdBannerComponent {
	constructor(private _router: Router) {}

	goToSellUsedBooks() {
		this._router.navigate([CLIENT_ROUTES.SELL_USED_BOOKS]);
	}
}
