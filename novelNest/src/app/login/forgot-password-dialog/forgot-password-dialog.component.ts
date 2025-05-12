import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'services/auth.service';

@Component({
	selector: 'app-forgot-password-dialog',
	standalone: true,
	imports: [MaterialModule, CommonModule, ReactiveFormsModule],
	templateUrl: './forgot-password-dialog.component.html',
	styleUrl: './forgot-password-dialog.component.scss',
})
export class ForgotPasswordDialogComponent {
	message = '';
	isSubmitting = false;

	constructor(
		private _fb: FormBuilder,
		private _authService: AuthService,
	) {}

	forgotForm = this._fb.group({
		email: [null, [Validators.required, Validators.email]],
	});

	/* onSubmit() {
		if (this.forgotForm.invalid) return;
		if (this.forgotForm.value.email) {
			this._authService.sendResetLink(this.forgotForm.value.email).subscribe({
				next: (res: any) => this.message = res.msg,
				error: (err: any) => this.message = err.error?.msg || 'Error sending reset email'
			});
		}
	} */

	onSubmit(): void {
		if (this.forgotForm.invalid) return;

		this.isSubmitting = true;
		this.message = '';

		this._authService
			.sendResetLink(this.forgotForm.value.email!)
			.subscribe({
				next: (res) => {
					this.message = res.msg;
					this.isSubmitting = false;
				},
				error: (err) => {
					this.message =
						err.error?.msg || 'Error sending reset email';
					this.isSubmitting = false;
				},
			});
	}
}
