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

	constructor(
		private _apiService: ApiService,
		private _storageService: StorageService,
		private _dialogRef: MatDialogRef<AddCategoryDialogComponent>,
	) {}

	onSubmit() {
		this._apiService
			.post<{ message: string; categories: { title: string }[] }>(
				'add-category',
				{
					title: this.address,
				},
			)
			.subscribe({
				next: (res) => {
					this.submitted = true;
					this.address = '';
                    // TODO: add new address to addresses
					// this._storageService.set('categories', res.categories);
					this._dialogRef.close();
				},
				error: (err) => {
					console.error('Failed to add category:', err);
					this.errorMessage = err;
				},
			});
	}
}
