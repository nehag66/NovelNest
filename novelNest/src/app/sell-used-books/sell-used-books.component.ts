import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CLIENT_ROUTES } from 'app/app.routes';
import { MaterialModule } from 'app/material.module';
import { Author, BookCondition, Category, Novel } from 'app/models/novel';
import { firstValueFrom } from 'rxjs';
import { ApiService } from 'services/api.service';
import { CacheService } from 'services/cache.service';
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
	categories: any;
	authors: any;
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
	userId: any;
	novelForm: FormGroup;
	isEditMode = false;
	novelId: string | null = null;
	photoError = '';

	constructor(
		private _fb: FormBuilder,
		private _apiService: ApiService,
		private _route: ActivatedRoute,
		private _router: Router,
		private _storageService: StorageService,
		private _cacheService: CacheService,
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
		this._cacheService.cacheCategories();
		this._cacheService.cacheAuthors();
		const rawAuthors = this._storageService.get<any>('authors');
		if (!Array.isArray(rawAuthors)) {
			this._storageService.set('authors', []);
			this.authors = [];
		} else {
			this.authors = rawAuthors.sort((a: Author, b: Author) => {
				if (a.name?.toLowerCase() === 'other') return 1; // push 'Other' to end
				if (b.name?.toLowerCase() === 'other') return -1;
				return a.name?.localeCompare(b.name);
			});
		}

		const rawCategories = this._storageService.get<any>('categories');
		if (!Array.isArray(rawCategories)) {
			this._storageService.set('categories', []);
			this.categories = [];
		} else {
			this.categories = rawCategories.sort((a: Category, b: Category) => {
				if (a.name?.toLowerCase() === 'other') return 1; // push 'Other' to end
				if (b.name?.toLowerCase() === 'other') return -1;
				return a.name?.localeCompare(b.name);
			});
		}
		this.novelId = this._route.snapshot.paramMap.get('id');
		if (this.novelId) {
			this.isEditMode = true;
			this.loadNovelDetails();
		}
	}

	get otherAuthorId(): string | undefined {
		return this.authors?.find((a: any) => a.name === 'Other')?._id;
	}

	selectCategory(categoryName: string) {
		this.novelForm.get('category')?.setValue(categoryName);
		// If user picked 'Other', make sure customCategory control exists and is required
		if (categoryName === 'Other') {
			this.novelForm.addControl(
				'customCategory',
				new FormControl('', Validators.required),
			);
		} else {
			// Remove customCategory control if not 'Other'
			if (this.novelForm.get('customCategory')) {
				this.novelForm.removeControl('customCategory');
			}
		}
	}

	selectAuthor(authorId: string, authorName: string) {
		this.novelForm.get('author')?.setValue(authorId);

		if (authorName === 'Other') {
			this.novelForm.addControl(
				'customAuthor',
				new FormControl('', Validators.required),
			);
		} else {
			if (this.novelForm.get('customAuthor')) {
				this.novelForm.removeControl('customAuthor');
			}
		}
	}

	getAuthorName(authorId: string): string | undefined {
		return this.authors?.find((author: any) => author._id === authorId)
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

	async postAd() {
		const isNew = !this.isEditMode;

		if (isNew && (!this.selectedFiles || this.selectedFiles.length === 0)) {
			this.photoError = CONSTANTS.UPLOAD_PHOTO_WARNING;
			return;
		} else {
			this.photoError = '';
		}

		this.isLoading = true;

		if (this.novelForm.valid) {
			this.userId = this._storageService.get<any[]>('userId');

			let { author, category } = this.novelForm.value;
			const { customAuthor, customCategory } = this.novelForm.value;

			try {
				// Handle "Other" Author
				if (
					author === this.otherAuthorId &&
					this.novelForm.get('customAuthor')?.value
				) {
					const newAuthor = { name: customAuthor, bio: '' };

					const res = await firstValueFrom(
						this._apiService.post<{
							message: string;
							authors: {
								_id: string;
								name: string;
								bio: string;
							}[];
						}>('authors', newAuthor),
					);

					if (res?.authors?.length) {
						// Update local storage and list
						this._storageService.set('authors', res.authors);
						this.authors = res.authors;

						// Find newly added author by name and get its _id
						const addedAuthor = res.authors.find(
							(a) => a.name === customAuthor,
						);
						if (addedAuthor?._id) {
							author = addedAuthor._id; // send ObjectId to backend
						} else {
							// fallback (unlikely)
							author = customAuthor;
						}
					}
				}

				// Handle "Other" Category
				if (category === 'Other' && customCategory) {
					const newCategory = { title: customCategory };

					const res = await firstValueFrom(
						this._apiService.post<{
							message: string;
							categories: { _id: string; title: string }[];
						}>('add-category', newCategory),
					);

					if (res?.categories?.length) {
						// Update local storage and list
						this._storageService.set('categories', res.categories);
						this.categories = res.categories;

						// Find newly added category by title and get its _id
						const addedCategory = res.categories.find(
							(c) => c.title === customCategory,
						);
						if (addedCategory?._id) {
							category = addedCategory._id; // send ObjectId to backend
						} else {
							// fallback (unlikely)
							category = customCategory;
						}
					}
				}

				// Prepare form data
				const formData = new FormData();

				// Append form fields
				Object.keys(this.novelForm.value).forEach((key) => {
					if (key !== 'customAuthor' && key !== 'customCategory') {
						formData.append(key, this.novelForm.value[key]);
					}
				});

				// Replace category & author with actual/new ones
				formData.set('author', author);
				formData.set('category', category);

				// Append images
				this.selectedFiles.forEach((image) => {
					formData.append('images', image);
				});

				if (this.userId) {
					formData.append('userId', this.userId);
				}

				// API Call for Novel
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
								this._router.navigateByUrl(
									CLIENT_ROUTES.NOVEL_LIST,
								);
							},
							error: () => {
								this.isLoading = false;
							},
						});
				}
			} catch (err) {
				console.error('Failed to add author/category:', err);
				this.isLoading = false;
				alert('Failed to add author/category. Please try again.');
			}
		} else {
			this.isLoading = false;
		}
	}

	resetForm() {
		this.novelForm.reset();
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
}
