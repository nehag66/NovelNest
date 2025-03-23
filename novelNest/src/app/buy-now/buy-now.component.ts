import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MaterialModule } from 'app/material.module';
import { Novel, NovelResponse } from 'app/models/novels';
import { ApiService } from 'services/api.service';
import { CONSTANTS } from 'shared/constants';

@Component({
	selector: 'buy-now',
	standalone: true,
	imports: [CommonModule, MaterialModule],
	templateUrl: './buy-now.component.html',
	styleUrl: './buy-now.component.scss',
})
export class BuyNowComponent implements OnInit {
	novelDetails!: Novel;

	constructor(
		private _activatedRoute: ActivatedRoute,
		private _apiService: ApiService,
	) {}

	ngOnInit(): void {
		let novelId: string | null;
		this._activatedRoute.paramMap.subscribe((params) => {
			novelId = params.get('id');
			novelId && this.fetchNovelDetails(novelId);
		});
	}

	fetchNovelDetails(novelId: string) {
		this._apiService
			.get<{
				message: string;
				novel: NovelResponse;
			}>(`novels/${novelId}`)
			.subscribe((res) => {
				const novel = res.novel;
				this.novelDetails = {
					title: novel.title,
					quantity: novel.quantity ?? 0,
					totalQuantity: novel.totalQuantity,
					price: novel.price,
					category: novel.category,
					author: novel.author,
					id: novel._id,
					bookCondition: novel.bookCondition,
					images: novel.images.map(
						(img: any) => `${CONSTANTS.IMAGE_URL}${img}`,
					),
				};
			});
	}

	placeOrder() {}
}
