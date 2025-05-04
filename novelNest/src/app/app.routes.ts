import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { AuthGuard } from 'shared/auth.guard';
import { BuyNowComponent } from './buy-now/buy-now.component';
import { NovelDetailsComponent } from './novel-list/novel-details/novel-details.component';
import { NovelListComponent } from './novel-list/novel-list.component';
import { SellUsedBooksComponent } from './sell-used-books/sell-used-books.component';
import { MyCartComponent } from './my-cart/my-cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { BasicInfoComponent } from './my-profile/basic-info/basic-info.component';
import { MyOrdersComponent } from './my-profile/my-orders/my-orders.component';
import { MyAddressesComponent } from './my-profile/my-addresses/my-addresses.component';
import { AuthorDetailsComponent } from './author-details/author-details.component';

export const CLIENT_ROUTES = {
	MY_CART: 'cart',
	SELL_USED_BOOKS: 'post-ad',
	EDIT_NOVELS: 'post-ad/:id',
	NOVEL_LIST: 'novels',
	BUY_BOOKS: 'buy-books',
	WISHLIST: 'wishlist',
	NOVEL: 'novels',
	NOVEL_DETAILS: 'novels/:id',
	AUTHOR_DETAILS: 'author/:id',
	PROFILE_DETAILS: 'user',
	BASIC_INFO: 'user-details',
	MY_ORDERS: 'orders',
	MY_ADDRESSES: 'addresses',
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
		canActivate: [AuthGuard],
	},
	{
		path: CLIENT_ROUTES.EDIT_NOVELS,
		// loadChildren: () => import('./sell-used-books/sell-used-books.component').then(m => m.SellUsedBooksComponent),
		component: SellUsedBooksComponent,
		title: 'Edit Novel',
		canActivate: [AuthGuard],
	},
	{
		path: CLIENT_ROUTES.NOVEL_LIST,
		// loadChildren: () => import('./all-books/all-books.component').then(m => m.NovelListComponent),
		component: NovelListComponent,
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
		path: CLIENT_ROUTES.AUTHOR_DETAILS,
		title: 'Author Details',
		component: AuthorDetailsComponent,
	},
	{
		path: CLIENT_ROUTES.BUY_BOOKS,
		// loadChildren: () => import('./buy-now/buy-now.component').then(m => m.BuyNowComponent),
		component: BuyNowComponent,
		title: 'Buy Now',
		canActivate: [AuthGuard],
	},
	{
		path: CLIENT_ROUTES.WISHLIST,
		// loadChildren: () => import('./buy-now/buy-now.component').then(m => m.WishlistComponent),
		component: WishlistComponent,
		title: 'Wishlist',
		canActivate: [AuthGuard],
	},
	{
		path: CLIENT_ROUTES.PROFILE_DETAILS,
		// loadChildren: () => import('./all-books/novel-details/novel-details.component').then(m => m.MyProfileComponent),
		component: MyProfileComponent,
		title: 'Profile',
		canActivate: [AuthGuard],
	},
	{
		path: CLIENT_ROUTES.BASIC_INFO,
		// loadChildren: () => import('./all-books/novel-details/novel-details.component').then(m => m.MyProfileComponent),
		component: BasicInfoComponent,
		title: 'Profile Details',
		canActivate: [AuthGuard],
	},
	{
		path: CLIENT_ROUTES.MY_ORDERS,
		// loadChildren: () => import('./all-books/novel-details/novel-details.component').then(m => m.MyProfileComponent),
		component: MyOrdersComponent,
		title: 'Orders',
		canActivate: [AuthGuard],
	},
	{
		path: CLIENT_ROUTES.MY_ADDRESSES,
		// loadChildren: () => import('./all-books/novel-details/novel-details.component').then(m => m.MyProfileComponent),
		component: MyAddressesComponent,
		title: 'Addresses',
		canActivate: [AuthGuard],
	},
	{
		path: CLIENT_ROUTES.MAIN_PAGE,
		// loadChildren: () => import('./main-page/main-page.component').then(m => m.MainPageComponent),
		component: MainPageComponent,
		title: 'Novel Nest',
	},
];
