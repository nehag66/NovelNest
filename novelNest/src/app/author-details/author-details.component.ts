import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CLIENT_ROUTES } from 'app/app.routes';
import { MaterialModule } from 'app/material.module';
import { AuthorDetailsResponse } from 'app/models/author';
import { ApiService } from 'services/api.service';
import { CONSTANTS } from 'shared/constants';
import { getBookCondition } from 'shared/utils';

@Component({
	selector: 'app-author-details',
	standalone: true,
	imports: [CommonModule, MaterialModule],
	templateUrl: './author-details.component.html',
	styleUrl: './author-details.component.scss',
})
export class AuthorDetailsComponent implements OnInit {
	authorDetails: any;
	getBookCondition = getBookCondition;

	constructor(
		private route: ActivatedRoute,
		private _router: Router,
		private apiService: ApiService,
	) {}

	ngOnInit(): void {
		const authorId = this.route.snapshot.paramMap.get('id');

		if (authorId) {
			this.apiService
				.get<AuthorDetailsResponse>(`authors/${authorId}`)
				.subscribe((author) => {
					this.authorDetails = {
						...author,
						novels: author.novels.map((novel) => ({
							...novel,
							images: novel.images.map(
								(img: string) => `${CONSTANTS.IMAGE_URL}${img}`,
							),
						})),
					};
				});
		}
	}

	goToNovelDetails(novelId: string) {
		this._router.navigate([CLIENT_ROUTES.NOVEL, novelId]);
	}
}
