import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'signup-dialog',
	standalone: true,
	imports: [MaterialModule, CommonModule, ReactiveFormsModule],
	templateUrl: './signup-dialog.component.html',
	styleUrl: './signup-dialog.component.scss',
})
export class SignupDialogComponent {
	hidePassword = true; // Controls the password visibility
	password: string = ''; // Model for the password input
	signUpForm: FormGroup;
	isLoading = false;
	errorMessage = '';

	constructor(private fb: FormBuilder, private _authService: AuthService, private _router: Router) {
		this.signUpForm = this.fb.group({
			emailOrPhone: ['', Validators.required],
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
				email: this.signUpForm.value.emailOrPhone,
				password: this.signUpForm.value.password,
			})
			.subscribe({
				next: (response: any) => {
					localStorage.setItem('token', response.token); // Store JWT token
					this._router.navigate(['/']); // Redirect
				},
				error: (error) => {
					this.errorMessage =
						error.error.message || 'Invalid credentials';
					this.isLoading = false;
				},
			});
	}
}
