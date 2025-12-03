export interface ProfileResponse {
	_id: string;
	name: string;
	email: string;
	password: string;
	addresses?: string[],
	mobile?: number,
	__v: number;
}
