import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from 'app/material.module';
import { ApiService } from 'services/api.service';

@Component({
	selector: 'app-novels-table',
	standalone: true,
	imports: [MaterialModule, CommonModule],
	templateUrl: './novels-table.component.html',
	styleUrl: './novels-table.component.scss',
})
export class NovelsTableComponent implements OnInit {
	displayedColumns: string[] = [
		'cover',
		'title',
		'category',
		'price',
		'mrp',
		'qty',
		'condition',
		'author',
		'user',
	];

	novels: any[] = [];

	constructor(private _apiService: ApiService) {}

	ngOnInit(): void {
		this._apiService.get('novels').subscribe((res: any) => {
			this.novels = res.novels;
		});
	}
}
