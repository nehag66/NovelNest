import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'services/api.service';
import { StorageService } from 'services/storage.service';

@Component({
	selector: 'app-add-author-dialog',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './add-author-dialog.component.html',
	styleUrl: './add-author-dialog.component.scss',
})
export class AddAuthorDialogComponent {
	name = '';
	bio = '';
	errorMessage = '';

	submitted = false;

	constructor(
		private _apiService: ApiService,
		private _storageService: StorageService,
		private _dialogRef: MatDialogRef<AddAuthorDialogComponent>,
	) {}

	onSubmit() {
		this._apiService
			.post<{
				message: string;
				authors: { name: string; bio: string }[];
			}>('authors', {
				name: this.name,
				bio: this.bio,
			})
			.subscribe({
				next: (res) => {
					this.submitted = true;
					this.name = '';
					this.bio = '';
					this._storageService.set('authors', res.authors);
					this._dialogRef.close();
				},
				error: (err) => {
					console.error('Failed to add category:', err);
					this.errorMessage = err;
				},
			});
	}
}
