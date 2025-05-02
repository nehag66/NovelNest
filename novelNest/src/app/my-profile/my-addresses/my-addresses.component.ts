import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from 'app/material.module';
import { AuthService } from 'services/auth.service';

@Component({
	selector: 'app-my-addresses',
	standalone: true,
	imports: [CommonModule, MaterialModule],
	templateUrl: './my-addresses.component.html',
	styleUrl: './my-addresses.component.scss',
})
export class MyAddressesComponent {
	addresses = [];
	isLoggedIn: string | null = null;

	constructor(private _authService: AuthService) {
		this.isLoggedIn = this._authService.bearerToken;
	}
}
