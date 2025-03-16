export interface Novel {
	id: string;
	title: string;
	category: string;
	quantity: number;
	totalQuantity: number;
	price: number;
	author: string;
	cartQuantity?: number; // check if this is needed or not
	// images?: any;
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
	// images: any;
}

export interface Categories {
	name: string;
}
