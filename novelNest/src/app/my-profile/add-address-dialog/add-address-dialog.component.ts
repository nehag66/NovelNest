import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'services/api.service';
import { StorageService } from 'services/storage.service';
import { AddCategoryDialogComponent } from '../add-category-dialog/add-category-dialog.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-add-address-dialog',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './add-address-dialog.component.html',
	styleUrl: './add-address-dialog.component.scss',
})
export class AddAddressDialogComponent {
	address = '';
	errorMessage = '';

	submitted = false;
	userId: any = '';
	profileDetails: any;

	constructor(
		private _apiService: ApiService,
		private _storageService: StorageService,
		private _dialogRef: MatDialogRef<AddCategoryDialogComponent>,
	) {}

	onSubmit() {
		this.profileDetails = this._storageService.get<string>('userInfo');
		this.userId = this._storageService.get<any[]>('userId') || [];
		this._apiService
			.post<{ message: string; address: { address: string }[] }>(
				`users/${this.userId}/addresses`,
				{
					address: this.address,
				},
			)
			.subscribe({
				next: (res: any) => {
					this.submitted = true;
					this.address = '';
					this.profileDetails.addresses = res.addresses;
					this._storageService.set('userInfo', this.profileDetails);
					this._dialogRef.close(res.addresses);
				},
				error: (err) => {
					console.error('Failed to add category:', err);
					this.errorMessage = err;
				},
			});
	}
}
