import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
	errorMessage = '';

	submitted = false;

	constructor(
		private _apiService: ApiService,
		private _storageService: StorageService,
	) {}

	onSubmit() {
		this._apiService
			.post<{ message: string; authors: { name: string }[] }>(
				'authors',
				{
					name: this.name,
				},
			)
			.subscribe({
				next: (res) => {
					// TODO fix this and check if authors are stored in local
					this.submitted = true;
					this.name = '';
					this._storageService.set(
						'authors',
						JSON.stringify(res.authors),
					);
				},
				error: (err) => {
					console.error('Failed to add category:', err);
					this.errorMessage = err;
				},
			});
	}
}
