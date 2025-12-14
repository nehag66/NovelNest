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
import { OrderPlacedComponent } from './order-placed/order-placed.component';
import { AboutComponent } from './footer/about/about.component';
import { ContactUsComponent } from './footer/contact-us/contact-us.component';
import { FeedbackComponent } from './footer/feedback/feedback.component';
import { HowItWorksComponent } from './footer/how-it-works/how-it-works.component';
import { FaqComponent } from './footer/faq/faq.component';
import { NoResultFoundComponent } from './novel-list/no-result-found/no-result-found.component';
import { SellingOrdersComponent } from './my-profile/selling-orders/selling-orders.component';
import { AdminTablesComponent } from './admin-tables/admin-tables.component';
import { UsersTableComponent } from './admin-tables/users-table/users-table.component';
import { OrdersTableComponent } from './admin-tables/orders-table/orders-table.component';
import { SellingOrdersTableComponent } from './admin-tables/selling-orders-table/selling-orders-table.component';
import { NovelsTableComponent } from './admin-tables/novels-table/novels-table.component';
import { CategoriesTableComponent } from './admin-tables/categories-table/categories-table.component';
import { AuthorsTableComponent } from './admin-tables/authors-table/authors-table.component';

export const CLIENT_ROUTES = {
	MY_CART: 'cart',
	SELL_USED_BOOKS: 'post-ad',
	EDIT_NOVELS: 'post-ad/:id',
	NOVEL_LIST: 'novels',
	NO_RESULTS_FOUND: 'no-results',
	BUY_BOOKS: 'buy-books',
	WISHLIST: 'wishlist',
	NOVEL: 'novels',
	NOVEL_DETAILS: 'novels/:id',
	AUTHOR_DETAILS: 'author/:id',
	PROFILE_DETAILS: 'user',
	BASIC_INFO: 'user-details',
	MY_ORDERS: 'orders',
	SELLING_ORDERS: 'selling-orders',
	MY_ADDRESSES: 'addresses',
	ORDER_PLACED: 'order-placed',
	ADMIN_HANDLE: 'admin',
	USERS_TABLE: 'users-data',
	ORDERS_TABLE: 'orders-data',
	SELLING_ORDERS_TABLE: 'selling-orders-data',
	NOVELS_TABLE: 'novels-data',
	CATEGORIES_TABLE: 'categories-data',
	AUTHORS_TABLE: 'authors-data',
	MAIN_PAGE: '',
	FOOTER_ROUTES: {
		ABOUT: 'about',
		CONTACT_US: 'contact-us',
		FEEDBACK: 'feedback',
		HOWITWORKS: 'how-it-works',
		FAQ: 'faq',
	},
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
		canActivate: [AuthGuard],
	},
	{
		path: CLIENT_ROUTES.EDIT_NOVELS,
		component: SellUsedBooksComponent,
		title: 'Edit Novel',
		canActivate: [AuthGuard],
	},
	{
		path: CLIENT_ROUTES.NOVEL_LIST,
		component: NovelListComponent,
		title: 'Buy New, Old and second hand books',
	},
	{
		path: CLIENT_ROUTES.NO_RESULTS_FOUND,
		component: NoResultFoundComponent,
		title: 'No Results Found',
	},
	{
		path: CLIENT_ROUTES.NOVEL_DETAILS,
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
		component: BuyNowComponent,
		title: 'Buy Now',
		canActivate: [AuthGuard],
	},
	{
		path: CLIENT_ROUTES.WISHLIST,
		component: WishlistComponent,
		title: 'Wishlist',
		canActivate: [AuthGuard],
	},
	{
		path: CLIENT_ROUTES.PROFILE_DETAILS,
		component: MyProfileComponent,
		title: 'Profile',
		canActivate: [AuthGuard],
	},
	{
		path: CLIENT_ROUTES.BASIC_INFO,
		component: BasicInfoComponent,
		title: 'Profile Details',
		canActivate: [AuthGuard],
	},
	{
		path: CLIENT_ROUTES.MY_ORDERS,
		component: MyOrdersComponent,
		title: 'Orders',
		canActivate: [AuthGuard],
	},
	{
		path: CLIENT_ROUTES.SELLING_ORDERS,
		component: SellingOrdersComponent,
		title: 'Selling Orders',
		canActivate: [AuthGuard],
	},
	{
		path: CLIENT_ROUTES.MY_ADDRESSES,
		component: MyAddressesComponent,
		title: 'Addresses',
		canActivate: [AuthGuard],
	},
	{
		path: CLIENT_ROUTES.ORDER_PLACED,
		component: OrderPlacedComponent,
		title: 'Order Placed Successfully!',
		canActivate: [AuthGuard],
	},
	{
		path: CLIENT_ROUTES.ADMIN_HANDLE,
		component: AdminTablesComponent,
		title: 'Admin Section',
		canActivate: [AuthGuard],
	},
	{
		path: CLIENT_ROUTES.USERS_TABLE,
		component: UsersTableComponent,
		title: 'Users',
		canActivate: [AuthGuard],
	},
	{
		path: CLIENT_ROUTES.ORDERS_TABLE,
		component: OrdersTableComponent,
		title: 'Orders',
		canActivate: [AuthGuard],
	},
	{
		path: CLIENT_ROUTES.SELLING_ORDERS_TABLE,
		component: SellingOrdersTableComponent,
		title: 'Selling Orders',
		canActivate: [AuthGuard],
	},
	{
		path: CLIENT_ROUTES.NOVELS_TABLE,
		component: NovelsTableComponent,
		title: 'Novels',
		canActivate: [AuthGuard],
	},
	{
		path: CLIENT_ROUTES.CATEGORIES_TABLE,
		component: CategoriesTableComponent,
		title: 'Categories',
		canActivate: [AuthGuard],
	},
	{
		path: CLIENT_ROUTES.AUTHORS_TABLE,
		component: AuthorsTableComponent,
		title: 'Authors',
		canActivate: [AuthGuard],
	},
	{
		path: CLIENT_ROUTES.MAIN_PAGE,
		component: MainPageComponent,
		title: 'Novel Nest',
	},
	{
		path: CLIENT_ROUTES.FOOTER_ROUTES.ABOUT,
		component: AboutComponent,
		title: 'About',
	},
	{
		path: CLIENT_ROUTES.FOOTER_ROUTES.CONTACT_US,
		component: ContactUsComponent,
		title: 'Contact Us',
	},
	{
		path: CLIENT_ROUTES.FOOTER_ROUTES.FEEDBACK,
		component: FeedbackComponent,
		title: 'Give us Feedback',
	},
	{
		path: CLIENT_ROUTES.FOOTER_ROUTES.HOWITWORKS,
		component: HowItWorksComponent,
		title: 'How it works?',
	},
	{
		path: CLIENT_ROUTES.FOOTER_ROUTES.FAQ,
		component: FaqComponent,
		title: 'Frequently Asked Questions',
	},
];
