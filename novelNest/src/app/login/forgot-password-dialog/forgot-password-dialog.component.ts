import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';

@Component({
	selector: 'forgot-password-dialog',
	standalone: true,
	imports: [MaterialModule],
	templateUrl: './forgot-password-dialog.component.html',
	styleUrl: './forgot-password-dialog.component.scss',
})
export class ForgotPasswordDialogComponent {}
