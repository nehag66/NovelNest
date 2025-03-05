import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from 'app/material.module';
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
	private readonly _apiService = inject(ApiService);
	categories: string[] = [];
	isLoggedIn = false;
	selectedFiles: File[] = [];
	previews: {
		url: string | ArrayBuffer | null;
		name: string;
		isImage: boolean;
	}[] = [];
	fileNames: string = 'No files chosen';
	ngOnInit() {
		this._apiService.get('categories').subscribe((response: any) => {
			this.categories = response.categories;
		});
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
}
