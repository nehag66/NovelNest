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
