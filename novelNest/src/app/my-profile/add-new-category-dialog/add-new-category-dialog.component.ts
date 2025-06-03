import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'services/api.service';
import { StorageService } from 'services/storage.service';

@Component({
	selector: 'app-add-new-category-dialog',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './add-new-category-dialog.component.html',
	styleUrl: './add-new-category-dialog.component.scss',
})
export class AddNewCategoryDialogComponent {
	title = '';

	submitted = false;

	constructor(
		private _apiService: ApiService,
		private _storageService: StorageService,
	) {}

	onSubmit() {
		this._apiService
			.post<{
				message: string;
				categories: [];
			}>('add-category', { title: this.title })
			.subscribe((res) => {
				this.submitted = true;
				this.title = '';
				this._storageService.set(
					'categories',
					JSON.stringify(res.categories),
				);
			});
	}
}
