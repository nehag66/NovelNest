import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MaterialModule } from 'app/material.module';
import { Novel } from 'app/models/novels';
import { ApiService } from 'services/api.service';
import { CartService } from 'services/cart.service';

@Component({
	selector: 'novel-details',
	standalone: true,
	imports: [CommonModule, MaterialModule],
	templateUrl: './novel-details.component.html',
	styleUrl: './novel-details.component.scss',
})
export class NovelDetailsComponent implements OnInit {
	novelDetails: Novel = {
		id: '',
		title: '',
		category: '',
		quantity: 0,
		totalQuantity: 0,
		price: 0,
		author: '',
	};

	constructor(
		private _activatedRoute: ActivatedRoute,
		private _apiService: ApiService,
		private _cartService: CartService,
	) {}

	ngOnInit() {
		this._activatedRoute.paramMap.subscribe((params) => {
			const novelId = params.get('id');
			this._apiService
				.get<{ message: string; novel: Novel }>(`novels/${novelId}`)
				.subscribe((res) => {
					this.novelDetails = res.novel;
				});
		});
	}

	addToCart() {
		this._cartService.addToCart(this.novelDetails);
	}
	buyNow() {}
}
