import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'services/api.service';
import { StorageService } from 'services/storage.service';

@Component({
	selector: 'app-add-category-dialog',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './add-category-dialog.component.html',
	styleUrl: './add-category-dialog.component.scss',
})
export class AddCategoryDialogComponent {
	title = '';
	errorMessage = '';

	submitted = false;

	constructor(
		private _apiService: ApiService,
		private _storageService: StorageService,
	) {}

	onSubmit() {
		this._apiService
			.post<{ message: string; categories: { title: string }[] }>(
				'add-category',
				{
					title: this.title,
				},
			)
			.subscribe({
				next: (res) => {
					this.submitted = true;
					this.title = '';
					this._storageService.set(
						'categories',
						JSON.stringify(res.categories),
					);
				},
				error: (err) => {
					console.error('Failed to add category:', err);
					this.errorMessage = err;
				},
			});
	}
}
