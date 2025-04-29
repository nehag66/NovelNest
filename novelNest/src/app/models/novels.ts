export interface Novel {
	id: string;
	title: string;
	category: string;
	totalQuantity: number;
	price: number;
	author: string;
	cartQuantity: number;
	bookCondition: string;
	images?: any;
}

export interface NovelResponse {
	_id: string;
	title: string;
	category: string;
	price: number;
	author: string;
	__v: number;
	totalQuantity: number;
	bookCondition: string;
	images?: any;
}

/* export interface NovelDeetsResponse {
	novel: {
		_id: string;
		title: string,
		category: string,
		price: number,
		__v: number,
		totalQuantity: number,
		author: string,
		bookCondition: number,
		images: string[],
	};
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
		__v: number;
		totalQuantity: number;
		author: string;
		bookCondition: number;
		images?: string[];
	};
	cartQuantity: number;
	_id: string;
}
