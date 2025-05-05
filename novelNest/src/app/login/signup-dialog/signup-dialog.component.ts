import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { AuthService } from 'services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginSignupDialogComponent } from '../login-signup-dialog/login-signup-dialog.component';

@Component({
	selector: 'app-signup-dialog',
	standalone: true,
	imports: [MaterialModule, CommonModule, ReactiveFormsModule],
	templateUrl: './signup-dialog.component.html',
	styleUrl: './signup-dialog.component.scss',
})
export class SignupDialogComponent {
	hidePassword = true;
	password = '';
	signUpForm: FormGroup;
	isLoading = false;
	errorMessage = '';

	constructor(
		private fb: FormBuilder,
		private _authService: AuthService,
		private _router: Router,
		private _dialogRef: MatDialogRef<LoginSignupDialogComponent>,
	) {
		this.signUpForm = this.fb.group({
			email: ['', [Validators.required]],
			name: ['', Validators.required],
			password: ['', Validators.required],
		});
	}

	togglePasswordVisibility() {
		this.hidePassword = !this.hidePassword;
	}

	onSignUp() {
		if (this.signUpForm.invalid) return;

		this.isLoading = true;
		this.errorMessage = '';
		this._authService
			.register({
				name: this.signUpForm.value.name,
				email: this.signUpForm.value.email,
				password: this.signUpForm.value.password,
			})
			.subscribe({
				next: () => {
					this._dialogRef.close();
					this._router.navigateByUrl('/');
				},
				error: (error) => {
					this.errorMessage =
						error.error.message || 'Invalid credentials';
					this.isLoading = false;
				},
			});
	}
}
