import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from 'app/material.module';
import { Categories, Novel } from 'app/models/novels';
import { ApiService } from 'services/api.service';
import { SharedModule } from 'shared/shared.module';

@Component({
	selector: 'sell-used-books',
	standalone: true,
	imports: [MaterialModule, SharedModule],
	templateUrl: './sell-used-books.component.html',
	styleUrl: './sell-used-books.component.scss',
})
export class SellUsedBooksComponent implements OnInit {
	categories: Categories[] = [];
	isLoggedIn = false;
	isLoading = false;
	selectedFiles: File[] = [];
	previews: {
		url: string | ArrayBuffer | null;
		name: string;
		isImage: boolean;
	}[] = [];
	fileNames: string = 'No files chosen';

	novelForm: FormGroup;

	constructor(private fb: FormBuilder, private _apiService: ApiService) {
		this.novelForm = this.fb.group({
			title: ['', Validators.required],
			category: ['', Validators.required],
			price: ['', [Validators.required, Validators.min(1)]],
			totalQuantity: ['', [Validators.required, Validators.min(1)]],
			author: ['', Validators.required],
			bookCondition: [null],
			// images: [null, Validators.required],
		});
	}

	ngOnInit() {
		this._apiService
			.get('categories')
			.subscribe(
				(response: any) => (this.categories = response.categories),
			);
	}

	selectCategory(category: string) {
		this.novelForm.get('category')?.setValue(category);
	}

	onFilesSelected(event: Event): void {
		const input = event.target as HTMLInputElement;
		if (input.files) {
			this.selectedFiles = Array.from(input.files);
			this.fileNames = this.selectedFiles
				.map((file) => file.name)
				.join(', ');

			// Generate previews for each file
			this.previews = [];
			this.selectedFiles.forEach((file) => {
				const reader = new FileReader();
				reader.onload = () => {
					this.previews.push({
						url: reader.result,
						name: file.name,
						isImage: file.type.startsWith('image/'),
					});
				};
				reader.readAsDataURL(file);
			});
		}
	}

	onUpload(): void {
		if (!this.selectedFiles.length) return;

		// Here, you would typically send the files to your server
		console.log('Files ready for upload:', this.selectedFiles);
		alert(`${this.selectedFiles.length} file(s) uploaded successfully!`);
	}

	postAd() {
		this.isLoading = true;
		if (this.novelForm.valid) {
			this._apiService
				.post<{
					message: string;
					novels: Novel[];
				}>('novels', this.novelForm.value)
				.subscribe({
					next: (res: any) => {
						this.isLoading = false;
						this.onUpload();
						console.log(res.message);
						this.novelForm.reset();
					},
					error: (err) => {
						this.isLoading = false;
						console.error('Failed to add novel:', err);
						alert('Failed to add novel. Please try again.');
					},
				});
		} else {
			this.isLoading = false;
			console.error('The form is not valid');
		}
	}

	resetForm() {
		this.novelForm.reset();
	}
}
