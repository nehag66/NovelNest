import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from 'app/material.module';
import { AuthService } from 'services/auth.service';
import { StorageService } from 'services/storage.service';
import { AddAddressDialogComponent } from '../add-address-dialog/add-address-dialog.component';

@Component({
	selector: 'app-my-addresses',
	standalone: true,
	imports: [CommonModule, MaterialModule],
	templateUrl: './my-addresses.component.html',
	styleUrl: './my-addresses.component.scss',
})
export class MyAddressesComponent implements OnInit {
	isLoggedIn: string | null = null;
	profileDetails: any;
	myAddresses: any;

	constructor(
		private _authService: AuthService,
		private _storageService: StorageService,
		private _dialogService: MatDialog,
	) {
		this.isLoggedIn = this._authService.bearerToken;
	}

	ngOnInit() {
		this.profileDetails = this._storageService.get<string>('userInfo');
		this.myAddresses = this.profileDetails.address;
	}

	addNewAddress() {
		const dialogRef = this._dialogService.open(AddAddressDialogComponent, {
			width: '400px',
			height: '350px',
			maxWidth: '80vw',
			minWidth: '200px',
			panelClass: 'custom-dialog',
		});
		dialogRef.afterClosed().subscribe();
	}
}
