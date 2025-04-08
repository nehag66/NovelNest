import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { AuthGuard } from 'shared/auth.guard';
import { BuyNowComponent } from './buy-now/buy-now.component';
import { NovelDetailsComponent } from './all-books/novel-details/novel-details.component';
import { AllBooksComponent } from './all-books/all-books.component';
import { SellUsedBooksComponent } from './sell-used-books/sell-used-books.component';
import { MyCartComponent } from './my-cart/my-cart.component';

export const CLIENT_ROUTES = {
	MY_CART: 'cart',
	SELL_USED_BOOKS: 'post-ad',
	EDIT_NOVELS: 'post-ad/:id',
	ALL_BOOKS: 'books',
	BUY_BOOKS: 'buy-books',
	NOVEL: 'novels',
	NOVEL_DETAILS: 'novels/:id',
	MAIN_PAGE: '',
};

export const routes: Routes = [
	{
		path: CLIENT_ROUTES.MY_CART,
		// loadChildren: () => import('./my-cart/my-cart.component').then(m => m.MyCartComponent),
		component: MyCartComponent,
		title: 'My Cart',
		// canActivate: [AuthGuard],
	},
	{
		path: CLIENT_ROUTES.SELL_USED_BOOKS,
		// loadChildren: () => import('./sell-used-books/sell-used-books.component').then(m => m.SellUsedBooksComponent),
		component: SellUsedBooksComponent,
		title: 'Sell your used books for money',
		// canActivate: [AuthGuard],
	},
	{
		path: CLIENT_ROUTES.EDIT_NOVELS,
		// loadChildren: () => import('./sell-used-books/sell-used-books.component').then(m => m.SellUsedBooksComponent),
		component: SellUsedBooksComponent,
		title: 'Edit Novel',
		canActivate: [AuthGuard],
	},
	{
		path: CLIENT_ROUTES.ALL_BOOKS,
		// loadChildren: () => import('./all-books/all-books.component').then(m => m.AllBooksComponent),
		component: AllBooksComponent,
		title: 'Buy New, Old and second hand books',
	},
	{
		path: CLIENT_ROUTES.NOVEL_DETAILS,
		// loadChildren: () => import('./all-books/novel-details/novel-details.component').then(m => m.NovelDetailsComponent),
		component: NovelDetailsComponent,
		title: 'Novel Details',
		canActivate: [AuthGuard],
	},
	{
		path: CLIENT_ROUTES.BUY_BOOKS,
		// loadChildren: () => import('./buy-now/buy-now.component').then(m => m.BuyNowComponent),
		component: BuyNowComponent,
		title: 'Buy Now',
		canActivate: [AuthGuard]
	},
	{
		path: CLIENT_ROUTES.MAIN_PAGE,
		// loadChildren: () => import('./main-page/main-page.component').then(m => m.MainPageComponent),
		component: MainPageComponent,
		title: 'Novel Nest',
	},
];
