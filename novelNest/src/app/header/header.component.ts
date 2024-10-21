import { Component, inject } from '@angular/core';
import { MaterialModule } from '../material.module';
import { MatDialog } from '@angular/material/dialog';
import { LoginSignupDialogComponent } from '../login/login-signup-dialog/login-signup-dialog.component';
import { Router } from '@angular/router';
import { CLIENT_ROUTES } from '../app.routes';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [MaterialModule],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
})
export class HeaderComponent {
	private readonly _dialog = inject(MatDialog);
	private readonly _router = inject(Router);
	openLoginSignup() {
		const dialogRef = this._dialog.open(LoginSignupDialogComponent, {
			width: '400px',
			height: '300px',
			maxWidth: '80vw',
			minWidth: '200px',
		});

		dialogRef.afterClosed().subscribe((result) => {});
	}

	goToCart() {
		this._router.navigate([CLIENT_ROUTES.MY_CART]);
	}

	goToSellUsedBooks() {
		this._router.navigate([CLIENT_ROUTES.SELL_USED_BOOKS]);
	}

	goToMainPage() {
		this._router.navigate([CLIENT_ROUTES.MAIN_PAGE]);
	}
}
