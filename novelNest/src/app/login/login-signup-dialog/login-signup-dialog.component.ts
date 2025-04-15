import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { SignupDialogComponent } from '../signup-dialog/signup-dialog.component';
import { ForgotPasswordDialogComponent } from '../forgot-password-dialog/forgot-password-dialog.component';

@Component({
	selector: 'app-login-signup-dialog',
	standalone: true,
	imports: [
		MaterialModule,
		LoginDialogComponent,
		SignupDialogComponent,
		ForgotPasswordDialogComponent,
	],
	templateUrl: './login-signup-dialog.component.html',
	styleUrl: './login-signup-dialog.component.scss',
})
export class LoginSignupDialogComponent {}
