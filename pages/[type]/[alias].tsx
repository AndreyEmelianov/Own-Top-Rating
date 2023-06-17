import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import axios from 'axios';
import { ParsedUrlQuery } from 'node:querystring';

import { TopPageComponent } from '@/page-components';
import { firstLevelMenu } from '@/helpers/helpers';
import { withLayout } from '@/layout/Layout';
import { IMenuItem } from '@/interfaces/menu.interface';
import { ITopPageModel, TopLevelCategory } from '@/interfaces/toppage.interface';
import { IProductModel } from '@/interfaces/product.interface';
import { API } from '@/helpers/api';

function TopPage({ firstCategory, page, products }: ITopPageProps): JSX.Element {
	return (
		<TopPageComponent firstCategory={firstCategory} page={page} products={products} />
	);
}

export default withLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {
	let paths: string[] = [];

	for (const m of firstLevelMenu) {
		const { data: menu } = await axios.post<IMenuItem[]>(API.topPage.find, {
			firstCategory: m.id,
		});
		paths = paths.concat(
			menu.flatMap((menuItem) =>
				menuItem.pages.map((page) => `/${m.route}/${page.alias}`)
			)
		);
	}

	return {
		paths,
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps<ITopPageProps> = async ({
	params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
	if (!params) {
		return {
			notFound: true,
		};
	}

	const firstCategoryItem = firstLevelMenu.find((menu) => menu.route == params.type);

	if (!firstCategoryItem) {
		return {
			notFound: true,
		};
	}

	try {
		const { data: menu } = await axios.post<IMenuItem[]>(API.topPage.find, {
			firstCategory: firstCategoryItem.id,
		});

		if (menu.length == 0) {
			return { notFound: true };
		}

		const { data: page } = await axios.get<ITopPageModel>(
			API.topPage.byAlias + params.alias
		);

		const { data: products } = await axios.post<IProductModel[]>(API.topPage.find, {
			category: page.category,
			limit: 10,
		});

		return {
			props: {
				menu,
				firstCategory: firstCategoryItem.id,
				page,
				products,
			},
		};
	} catch {
		return {
			notFound: true,
		};
	}
};

interface ITopPageProps extends Record<string, unknown> {
	menu: IMenuItem[];
	firstCategory: TopLevelCategory;
	page: ITopPageModel;
	products: IProductModel[];
}
