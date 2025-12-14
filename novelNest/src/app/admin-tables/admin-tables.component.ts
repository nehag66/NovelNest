import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CLIENT_ROUTES } from 'app/app.routes';
import { MaterialModule } from 'app/material.module';

@Component({
	selector: 'app-admin-tables',
	standalone: true,
	imports: [MaterialModule, CommonModule],
	templateUrl: './admin-tables.component.html',
	styleUrl: './admin-tables.component.scss',
})
export class AdminTablesComponent {

	constructor(private _router: Router) {}

	goToUsersTable() {
		// TODO: replace routes
		this._router.navigateByUrl(CLIENT_ROUTES.USERS_TABLE);
	}

	goToOrdersTable() {
		// TODO: replace routes
		this._router.navigateByUrl(CLIENT_ROUTES.ORDERS_TABLE);
	}

	goToSellingOrdersTable() {
		// TODO: replace routes
		this._router.navigateByUrl(CLIENT_ROUTES.SELLING_ORDERS_TABLE);
	}

	goToNovelsTable() {
		// TODO: replace routes
		this._router.navigateByUrl(CLIENT_ROUTES.NOVELS_TABLE);
	}

	goToCategoriesTable() {
		// TODO: replace routes
		this._router.navigateByUrl(CLIENT_ROUTES.CATEGORIES_TABLE);
	}

	goToAuthorsTable() {
		// TODO: replace routes
		this._router.navigateByUrl(CLIENT_ROUTES.AUTHORS_TABLE);
	}

}
