import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';

@Component({
	selector: 'login-dialog',
	standalone: true,
	imports: [MaterialModule],
	templateUrl: './login-dialog.component.html',
	styleUrl: './login-dialog.component.scss',
})
export class LoginDialogComponent {
	hidePassword = true; // Controls the password visibility
	password: string = ''; // Model for the password input

	togglePasswordVisibility() {
		this.hidePassword = !this.hidePassword;
	}
}
