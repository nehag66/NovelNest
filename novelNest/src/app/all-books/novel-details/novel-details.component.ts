import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MaterialModule } from 'app/material.module';
import { BookCondition, Novel, NovelResponse } from 'app/models/novels';
import { ApiService } from 'services/api.service';
import { CartService } from 'services/cart.service';
import { CONSTANTS } from 'shared/constants';

@Component({
	selector: 'novel-details',
	standalone: true,
	imports: [CommonModule, MaterialModule],
	templateUrl: './novel-details.component.html',
	styleUrl: './novel-details.component.scss',
})
export class NovelDetailsComponent implements OnInit {
	novelDetails!: Novel;
	cartQuantity: number = 0;
	isFavorite = false;

	constructor(
		private _activatedRoute: ActivatedRoute,
		private _apiService: ApiService,
		private _cartService: CartService,
	) {}

	ngOnInit() {
		let novelId: string | null;
		this._activatedRoute.paramMap.subscribe((params) => {
			novelId = params.get('id');
			novelId && this.fetchNovelDetails(novelId);
		});
		this._cartService.getCart().subscribe((cart) => {
			/* const cartItem = cart.find((item) => item.id === novelId);
			this.cartQuantity = cartItem ? cartItem.quantity : 0; */
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

	getBookCondition(condition: string): string {
		switch (condition) {
			case BookCondition.Excellent:
				return 'Excellent';
			case BookCondition.Good:
				return 'Good';
			case BookCondition.Fair:
				return 'Fair';
			default:
				return 'Unknown';
		}
	}

	buyBtnDisabled() {
		if (!this.cartQuantity) return false;
		return (
			this.cartQuantity &&
			this.novelDetails.totalQuantity <= this.cartQuantity
		);
	}

	addToCart() {
		this._cartService.addToCart(this.novelDetails?.id);
	}

	toggleHeart() {
		this.isFavorite = !this.isFavorite;
	}
}
