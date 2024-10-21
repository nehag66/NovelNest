import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';

@Component({
	selector: 'signup-dialog',
	standalone: true,
	imports: [MaterialModule],
	templateUrl: './signup-dialog.component.html',
	styleUrl: './signup-dialog.component.scss',
})
export class SignupDialogComponent {
	hidePassword = true; // Controls the password visibility
	password: string = ''; // Model for the password input

	togglePasswordVisibility() {
		this.hidePassword = !this.hidePassword;
	}
}
