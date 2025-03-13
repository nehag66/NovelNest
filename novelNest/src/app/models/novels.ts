export interface Novel {
	id: string;
	title: string;
	category: string;
	quantity: number;
	totalQuantity: number;
	price: number;
	author: string;
	cartQuantity?: number; // check if this is needed or not
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
}

export interface Categories {
	name: string;
}
