import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import axios from 'axios';
import { ParsedUrlQuery } from 'node:querystring';

import { withLayout } from '@/layout/Layout';
import { IMenuItem } from '@/interfaces/menu.interface';
import { ITopPageModel } from '@/interfaces/toppage.interface';
import { IProductModel } from '@/interfaces/product.interface';

const firstCategory = 0;

function Course({ menu, page, products }: CourseProps): JSX.Element {
	return <>{products && products.length}</>;
}

export default withLayout(Course);

export const getStaticPaths: GetStaticPaths = async () => {
	const { data: menu } = await axios.post<IMenuItem[]>(
		process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
		{
			firstCategory,
		}
	);

	return {
		paths: menu.flatMap((menuItem) =>
			menuItem.pages.map((page) => '/courses/' + page.alias)
		),
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps<CourseProps> = async ({
	params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
	if (!params) {
		return {
			notFound: true,
		};
	}

	const { data: menu } = await axios.post<IMenuItem[]>(
		process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
		{
			firstCategory,
		}
	);

	const { data: page } = await axios.get<ITopPageModel>(
		process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/byAlias/' + params.alias
	);

	const { data: products } = await axios.post<IProductModel[]>(
		process.env.NEXT_PUBLIC_DOMAIN + '/api/product/find',
		{
			category: page.category,
			limit: 10,
		}
	);

	return {
		props: {
			menu,
			firstCategory,
			page,
			products,
		},
	};
};

interface CourseProps extends Record<string, unknown> {
	menu: IMenuItem[];
	firstCategory: number;
	page: ITopPageModel;
	products: IProductModel[];
}