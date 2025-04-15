import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanActivateFn } from '@angular/router';
import { LoginSignupDialogComponent } from 'app/login/login-signup-dialog/login-signup-dialog.component';
import { AuthService } from 'services/auth.service';

export const AuthGuard: CanActivateFn = () => {

	const authService = inject(AuthService);
	const dialogService = inject(MatDialog);

	if (authService.isAuthenticated()) {
		return true;
	} else {
		const dialogRef = dialogService.open(LoginSignupDialogComponent, {
			width: '400px',
			height: '350px',
			maxWidth: '80vw',
			minWidth: '200px',
			panelClass: 'custom-dialog',
		});
		dialogRef.afterClosed().subscribe();
		return false;
	}
};
