import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CLIENT_ROUTES } from 'app/app.routes';
import { MaterialModule } from 'app/material.module';
import { AuthService } from 'services/auth.service';

@Component({
	selector: 'app-my-orders',
	standalone: true,
	imports: [CommonModule, MaterialModule],
	templateUrl: './my-orders.component.html',
	styleUrl: './my-orders.component.scss',
})
export class MyOrdersComponent {
	orders = [];
	isLoggedIn: string | null = null;

	constructor(private _router: Router, private _authService: AuthService) {
		this.isLoggedIn = this._authService.bearerToken;
	}

	goToBuyBooks() {
		this._router.navigateByUrl(CLIENT_ROUTES.NOVEL_LIST);
	}
}
