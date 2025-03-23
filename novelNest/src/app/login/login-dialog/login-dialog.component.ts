import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'services/auth.service';
import { LoginSignupDialogComponent } from '../login-signup-dialog/login-signup-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'login-dialog',
	standalone: true,
	imports: [MaterialModule, CommonModule, ReactiveFormsModule],
	templateUrl: './login-dialog.component.html',
	styleUrl: './login-dialog.component.scss',
})
export class LoginDialogComponent {
	hidePassword = true; // Controls the password visibility
	password: string = ''; // Model for the password input

	loginForm: FormGroup;
	isLoading = false;
	errorMessage = '';

	constructor(
		private fb: FormBuilder,
		private _router: Router,
		private _authService: AuthService,
		private _dialogRef: MatDialogRef<LoginSignupDialogComponent>,
	) {
		this.loginForm = this.fb.group({
			emailOrPhone: ['', Validators.required],
			password: ['', Validators.required],
		});
	}

	togglePasswordVisibility() {
		this.hidePassword = !this.hidePassword;
	}

	onLogin() {
		if (this.loginForm.invalid) return;

		this.isLoading = true;
		this.errorMessage = '';
		this._authService
			.login({
				email: this.loginForm.value.emailOrPhone,
				password: this.loginForm.value.password,
			})
			.subscribe({
				next: (response: any) => {
					this.isLoading = false;
					this._dialogRef.close();
					localStorage.setItem('token', response.token); // Store JWT token
					this._router.navigate(['/']);
				},
				error: (error) => {
					this.errorMessage =
						error.error.message || 'Invalid credentials';
					this.isLoading = false;
				},
			});
	}
}
