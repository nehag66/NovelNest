import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CLIENT_ROUTES } from 'app/app.routes';
import { LoginSignupDialogComponent } from 'app/login/login-signup-dialog/login-signup-dialog.component';
import { MaterialModule } from 'app/material.module';
import { SharedModule } from 'shared/shared.module';

@Component({
	selector: 'my-cart',
	standalone: true,
	imports: [MaterialModule, SharedModule],
	templateUrl: './my-cart.component.html',
	styleUrl: './my-cart.component.scss',
})
export class MyCartComponent {
	private readonly _dialog = inject(MatDialog);
	private readonly _router = inject(Router);
	cartItems = [];
	isLoggedIn = false;

	openLoginDialog(e: Event) {
		e.preventDefault();
		const dialogRef = this._dialog.open(LoginSignupDialogComponent, {
			width: '400px',
			height: '300px',
			maxWidth: '80vw',
			minWidth: '200px',
		});
		dialogRef.afterClosed().subscribe((result) => {});
	}

	goToBuyBooks() {
		this._router.navigate([CLIENT_ROUTES.BUY_BOOKS]);
	}
}
