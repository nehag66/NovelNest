import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { SellUsedBooksComponent } from './sell-used-books/sell-used-books.component';
import { BuyBooksComponent } from './buy-books/buy-books.component';
import { MyCartComponent } from './my-cart/my-cart.component';

export const CLIENT_ROUTES = {
	MY_CART: 'cart',
	SELL_USED_BOOKS: 'post-ad',
	BUY_BOOKS: 'books',
	MAIN_PAGE: '',
};

export const routes: Routes = [
	{
		path: CLIENT_ROUTES.MY_CART,
		component: MyCartComponent,
		title: 'My Cart',
	},
	{
		path: CLIENT_ROUTES.SELL_USED_BOOKS,
		component: SellUsedBooksComponent,
		title: 'Sell your used books for money',
	},
	{
		path: CLIENT_ROUTES.BUY_BOOKS,
		component: BuyBooksComponent,
		title: 'Buy New, Old and second hand books',
	},
	{
		path: CLIENT_ROUTES.MAIN_PAGE,
		component: MainPageComponent,
		title: 'Novel Nest',
	},
];
