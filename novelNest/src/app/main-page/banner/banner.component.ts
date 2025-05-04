import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { Router } from '@angular/router';
import { CLIENT_ROUTES } from '../../app.routes';

@Component({
	selector: 'app-banner',
	standalone: true,
	imports: [MaterialModule],
	templateUrl: './banner.component.html',
	styleUrl: './banner.component.scss',
})
export class BannerComponent {
	constructor(private _router: Router) {}

	goToBuyBooks() {
		this._router.navigate([CLIENT_ROUTES.NOVEL_LIST]);
	}

	goToSellUsedBooks() {
		this._router.navigate([CLIENT_ROUTES.SELL_USED_BOOKS]);
	}
}
