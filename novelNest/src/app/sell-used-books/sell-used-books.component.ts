import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CONSTANTS } from 'app/constants';
import { MaterialModule } from 'app/material.module';
import {
	BookCondition,
	Categories,
	Category,
	Novel,
} from 'app/models/novels';
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
	uploadedImageUrls: string[] = [];
	previews: {
		url: string | ArrayBuffer | null;
		name: string;
		isImage: boolean;
	}[] = [];
	fileNames: string = 'No files chosen';
	BookConditions = BookCondition;

	novelForm: FormGroup;
	isEditMode: boolean = false;
	novelId: string | null = null;

	constructor(
		private fb: FormBuilder,
		private _apiService: ApiService,
		private _route: ActivatedRoute,
		private _router: Router,
	) {
		this.novelForm = this.fb.group({
			title: ['', Validators.required],
			category: ['', Validators.required],
			price: ['', [Validators.required, Validators.min(1)]],
			totalQuantity: ['', [Validators.required, Validators.min(1)]],
			author: ['', Validators.required],
			bookCondition: [null],
			images: [[]], // Will store uploaded images
		});
	}

	ngOnInit() {
		this._apiService
			.get<{ message: string; categories: Category[] }>('categories')
			.subscribe((response: any) => {
				this.categories = response.categories.sort(
					(a: Category, b: Category) => a.name?.localeCompare(b.name),
				);
			});
		this.novelId = this._route.snapshot.paramMap.get('id');
		if (this.novelId) {
			this.isEditMode = true;
			this.loadNovelDetails();
		}
	}

	loadNovelDetails() {
		this._apiService
			.get<{
				message: string;
				novels: Novel[];
			}>(`novels/${this.novelId!}`)
			.subscribe((novel: any) => {
				this.novelForm.patchValue(novel.novel);
				if (novel.novel.images) {
					this.previews = novel.novel?.images?.map(
						(img: string) => `${CONSTANTS.IMAGE_URL}${img}`,
					);
					this.fileNames = novel.novel?.images
						.map((img: string) => this.getFileName(img))
						.join(', ');
				}
			});
	}
	getFileName(imageUrl: string): string {
		return imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
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

	postAd() {
		this.isLoading = true;
		if (this.novelForm.valid) {
			const formData = new FormData();

			// Append form fields
			Object.keys(this.novelForm.value).forEach((key) => {
				formData.append(key, this.novelForm.value[key]);
			});

			// Append images
			this.selectedFiles.forEach((image) => {
				formData.append('images', image);
			});

			if (!this.isEditMode) {
				this._apiService
					.post<{
						message: string;
						novels: Novel[];
					}>('novels', formData)
					.subscribe({
						next: (res: any) => {
							this.isLoading = false;
							console.log(res.message);
							this.novelForm.reset();
							this.fileNames = 'No files chosen'; // Clear displayed filenames
							this.selectedFiles = []; // Clear selected images
							this.previews = []; // Clear previews after successful upload
						},
						error: (err) => {
							this.isLoading = false;
							console.error('Failed to add novel:', err);
							alert('Failed to add novel. Please try again.');
						},
					});
			} else {
				this._apiService
					.put(`novels/${this.novelId!}`, formData)
					.subscribe({
						next: () => {
							this.isLoading = false;
							this._router.navigate(['/books']);
						},
						error: (err) => {
							this.isLoading = false;
							console.error('Failed to add novel:', err);
						},
					});
			}
		} else {
			this.isLoading = false;
			console.error('The form is not valid');
		}
	}

	resetForm() {
		this.novelForm.reset();
	}
}
