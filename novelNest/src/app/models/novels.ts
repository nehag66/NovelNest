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
}

/* export interface NovelDeetsResponse {
	novel: NovelResponse;
	message: string;
} */

export interface Categories {
	name: string;
}

export enum BookCondition {
	Excellent = '1',
	Good = '2',
	Fair = '3',
}

export interface Category {
	name: string;
	_id: string;
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
