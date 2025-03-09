import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Novel } from 'app/models/novels';
import { ApiService } from 'services/api.service';

@Component({
	selector: 'novel-details',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './novel-details.component.html',
	styleUrl: './novel-details.component.scss',
})
export class NovelDetailsComponent implements OnInit {

	novelDetails: any;

	constructor(private _activatedRoute: ActivatedRoute, private _apiService: ApiService) {}

	ngOnInit() {
		this._activatedRoute.paramMap.subscribe((params) => {
			const novelId = params.get('id');
			this._apiService.get<{ message: string; novel: Novel }>(`novels/${novelId}`)
			.subscribe((res) => {
				this.novelDetails = res.novel;
			})
		});
	}
}
