export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products,
}

export interface ITopPageAdvatage {
	_id: string;
	title: string;
	description: string;
}

export interface IHhData {
	_id: string;
	count: number;
	juniorSalary: number;
	middleSalary: number;
	seniorSalary: number;
	updatedAt: Date;
}

export interface ITopPageModel {
	tags: string[];
	_id: string;
	secondCategory: string;
	alias: string;
	title: string;
	category: string;
	seoText?: string;
	tagsTitle: string;
	metaTitle: string;
	metaDescription: string;
	firstCategory: TopLevelCategory;
	advantages?: ITopPageAdvatage[];
	createdAt: Date;
	updatedAt: Date;
	hh?: IHhData;
}
