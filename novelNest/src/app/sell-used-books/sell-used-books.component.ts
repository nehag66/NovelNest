import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from 'app/material.module';
import {
	BookCondition,
	Categories,
	Category,
	CategoryResponse,
	Novel,
} from 'app/models/novels';
import { ApiService } from 'services/api.service';
import { StorageService } from 'services/storage.service';
import { CONSTANTS } from 'shared/constants';
import { SharedModule } from 'shared/shared.module';

@Component({
	selector: 'app-sell-used-books',
	standalone: true,
	imports: [MaterialModule, SharedModule],
	templateUrl: './sell-used-books.component.html',
	styleUrl: './sell-used-books.component.scss',
})
export class SellUsedBooksComponent implements OnInit {
	categories: Categories[] = [];
	isLoading = false;
	selectedFiles: File[] = [];
	uploadedImageUrls: string[] = [];
	previews: {
		url: string | ArrayBuffer | null;
		name: string;
		isImage: boolean;
	}[] = [];
	fileNames = 'No files chosen';
	BookConditions = BookCondition;

	novelForm: FormGroup;
	isEditMode = false;
	novelId: string | null = null;
	cachedAuthors: any;
	photoError = '';

	constructor(
		private _fb: FormBuilder,
		private _apiService: ApiService,
		private _route: ActivatedRoute,
		private _router: Router,
		private _storageService: StorageService,
	) {
		this.novelForm = this._fb.group({
			title: ['', Validators.required],
			category: ['', Validators.required],
			price: ['', [Validators.required, Validators.min(1)]],
			mrp: ['', [Validators.required, Validators.min(1)]],
			totalQuantity: ['', [Validators.required, Validators.min(1)]],
			author: ['', Validators.required],
			bookCondition: [null],
			images: [[]], // Will store uploaded images
		});
	}

	ngOnInit() {
		this.cachedAuthors = this._storageService.get<any[]>('authors') || [];
		this.cachedAuthors.sort((a: Category, b: Category) =>
			a.name?.localeCompare(b.name),
		);
		this._apiService
			.get<{ message: string; categories: Category[] }>('categories')
			.subscribe((response: CategoryResponse) => {
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

	private loadNovelDetails() {
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
	private getFileName(imageUrl: string): string {
		return imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
	}

	selectCategory(category: string) {
		this.novelForm.get('category')?.setValue(category);
	}

	selectAuthor(authorId: string): void {
		this.novelForm.get('author')?.setValue(authorId);
		this.novelForm.get('author')?.markAsTouched();
	}

	getAuthorName(authorId: string): string | undefined {
		return this.cachedAuthors.find((author: any) => author._id === authorId)
			?.name;
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
		const isNew = !this.isEditMode;
		if (isNew && (!this.selectedFiles || this.selectedFiles.length === 0)) {
			this.photoError = 'Please upload at least one photo.';
			return;
		} else {
			this.photoError = '';
		}
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
						next: () => {
							this.isLoading = false;
							this.novelForm.reset();
							this.fileNames = 'No files chosen';
							this.selectedFiles = [];
							this.previews = [];
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
						error: () => {
							this.isLoading = false;
						},
					});
			}
		} else {
			this.isLoading = false;
		}
	}

	resetForm() {
		this.novelForm.reset();
	}
}
