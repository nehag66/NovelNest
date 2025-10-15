export interface NovelSummary {
	_id: string;
	title: string;
}

export interface Novel {
	id: string;
	title: string;
	category: string;
	totalQuantity: number;
	price: number;
	mrp: number;
	author: any;
	cartQuantity: number;
	bookCondition: string;
	images?: any;
	user: {
		name: string;
		email: string;
		// mobile: number;
		// address: string;
	};
}

export interface NovelResponse {
	_id: string;
	title: string;
	category: string;
	price: number;
	mrp: number;
	author: string;
	__v: number;
	totalQuantity: number;
	bookCondition: string;
	images?: any;
	user: string;
}

export interface Categories {
	name: string;
}

export enum BookCondition {
	Excellent = '1',
	Good = '2',
	Fair = '3',
}

export interface Author {
	name: string;
	novels: NovelTitle[];
}

export interface NovelTitle {
	title: string;
}

export interface Category {
	name: string;
}

export interface CategoryResponse {
	categories: Category[];
	message: string;
}

export interface CartResponse {
	novelId: {
		_id: string;
		title: string;
		category: string;
		price: number;
		mrp: number;
		__v: number;
		totalQuantity: number;
		author: string;
		bookCondition: number;
		images?: string[];
	};
	quantity: number;
	_id: string;
}

export interface Wishlist {
	novelId: {
		_id: string;
		title: string;
		category: string;
		price: number;
		mrp: number;
		__v: number;
		totalQuantity: number;
		author: string;
		bookCondition: number;
		images?: string[];
	};
	cartQuantity: number;
	_id: string;
}
