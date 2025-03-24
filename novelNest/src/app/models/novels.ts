export interface Novel {
	id: string;
	title: string;
	category: string;
	quantity: number;
	totalQuantity: number;
	price: number;
	author: string;
	cartQuantity?: number; // check if this is needed or not
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
	quantity: number;
	bookCondition: string;
	images?: any;
}

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
		images?: any;
	};
	quantity: number;
	_id: string;
}
