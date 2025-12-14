import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from 'app/material.module';
import { ApiService } from 'services/api.service';

@Component({
	selector: 'app-categories-table',
	standalone: true,
	imports: [MaterialModule, CommonModule],
	templateUrl: './categories-table.component.html',
	styleUrl: './categories-table.component.scss',
})
export class CategoriesTableComponent implements OnInit {
	displayedColumns: string[] = ['name', 'id'];
	categories: any[] = [];

	constructor(private _apiService: ApiService) {}

	ngOnInit(): void {
		this._apiService.get('categories').subscribe((res: any) => {
			this.categories = res.categories;
		});
	}
}
