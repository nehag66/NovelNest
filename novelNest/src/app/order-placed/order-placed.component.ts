import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CLIENT_ROUTES } from 'app/app.routes';

@Component({
	selector: 'app-order-placed',
	standalone: true,
	imports: [],
	templateUrl: './order-placed.component.html',
	styleUrl: './order-placed.component.scss',
})
export class OrderPlacedComponent {
	constructor(private _router: Router) {}

	goToBuyBooks() {
		this._router.navigate([CLIENT_ROUTES.NOVEL_LIST]);
	}
}
