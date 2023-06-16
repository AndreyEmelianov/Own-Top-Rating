import { IProductModel } from '@/interfaces/product.interface';
import { ITopPageModel, TopLevelCategory } from '@/interfaces/toppage.interface';

export interface ITopPageComponentProps {
	firstCategory: TopLevelCategory;
	page: ITopPageModel;
	products: IProductModel[];
}
