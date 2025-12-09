import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from 'app/material.module';
import { ApiService } from 'services/api.service';

@Component({
	selector: 'app-authors-table',
	standalone: true,
	imports: [MaterialModule, CommonModule],
	templateUrl: './authors-table.component.html',
	styleUrl: './authors-table.component.scss',
})
export class AuthorsTableComponent implements OnInit {
	displayedColumns: string[] = [
		'name',
		'bio',
		'novels',
		'createdAt',
		'updatedAt',
	];

	authors: any[] = [];

	constructor(private _apiService: ApiService) {}

	ngOnInit(): void {
		this._apiService.get('author-details').subscribe((res: any) => {
			this.authors = res.authors;
		});
	}
}
