import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CLIENT_ROUTES } from 'app/app.routes';
import { MaterialModule } from 'app/material.module';
import { Novel } from 'app/models/novels';
import { map } from 'rxjs';
import { ApiService } from 'services/api.service';
import { CartService } from 'services/cart.service';
import { SharedModule } from 'shared/shared.module';

@Component({
	selector: 'buy-books',
	standalone: true,
	imports: [SharedModule, MaterialModule],
	templateUrl: './buy-books.component.html',
	styleUrl: './buy-books.component.scss',
})
export class BuyBooksComponent implements OnInit {
	novels: any[]= [];
	cart = [];
	constructor(
		private _router: Router,
		private _apiService: ApiService,
		private _cartService: CartService,
	) {}

	ngOnInit() {
		this._apiService
			.get<{ message: string; novels: Novel[] }>('novels')
			.pipe(
				map((novelData: any) => {
					return novelData.novels.map((novel: any) => {
						return {
							title: novel.title,
							quantity: novel.quantity,
							totalQuantity: novel.totalQuantity,
							price: novel.price,
							category: novel.category,
							author: novel.author,
							id: novel._id,
						};
					});
				}),
			)
			.subscribe((novels: any) => {
				this.novels = novels;
			});
	}

	mergeCartItems() {
		return this.cart.reduce((acc: any, item: any) => {
		  const existingItem = acc.find((product: any) => product.id === item.id);
		  if (existingItem) {
			existingItem.quantity += item.quantity; // Add quantity
		  } else {
			acc.push({ ...item });
		  }
		  return acc;
		}, []);
	  }

	  updateNovelsWithCart() {
		const mergedCart = this.mergeCartItems(); // Merge duplicates first
		return this.novels.map((novel: any) => {
		  const cartItem = mergedCart.find((item: any) => item.id === novel._id);
		  return {
			...novel,
			cartQuantity: cartItem ? cartItem.quantity : 0, // Attach quantity
		  };
		});
	  }

	goToNovelDetails(novelId: string) {
		this._router.navigate([CLIENT_ROUTES.NOVEL, novelId]);
	}

	addToCart(novel: Novel) {
		this._cartService.addToCart(novel);
		this.novels = this.updateNovelsWithCart();
	}
	buyNow() {}
}
