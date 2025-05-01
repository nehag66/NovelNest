import { NovelResponse, NovelSummary } from './novels';

export interface Author {
	id: string;
	name: string;
	bio?: string;
	imageUrl?: string;
	novels?: string[];
}

export interface AuthorSummary {
	_id: string;
	name: string;
	novels: NovelSummary[];
}

export interface AuthorResponse {
	authors: AuthorSummary[];
	message: string;
}

export interface AuthorDetailsResponse {
	_id: string;
	name: string;
	bio: string;
	novels: NovelResponse[];
	__v: number;
	createdAt: string;
	updatedAt: string;
}
