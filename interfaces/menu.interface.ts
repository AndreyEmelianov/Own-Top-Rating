import { TopLevelCategory } from './toppage.interface';

export interface IPageItem {
	alias: string;
	title: string;
	_id: string;
	category: string;
}

export interface IMenuItem {
	_id: {
		secondCategory: string;
	};
	pages: IPageItem[];
}

export interface IFirstLevelMenuItem {
	route: string;
	name: string;
	icon: JSX.Element;
	id: TopLevelCategory;
}
