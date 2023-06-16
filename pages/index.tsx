import { useState } from 'react';
import { GetStaticProps } from 'next';
import axios from 'axios';

import { Button, Htag, Input, P, Rating, Search, Tag, Textarea } from '@/components';
import { withLayout } from '@/layout/Layout';
import { IMenuItem } from '@/interfaces/menu.interface';

function Home({ menu }: HomeProps): JSX.Element {
	const [rating, setRating] = useState<number>(4);

	return (
		<>
			<Htag tag="h1">Text</Htag>
			<Button appearance="primary" arrow="right">
				Btne
			</Button>
			<Button appearance="ghost" arrow="down">
				Btne
			</Button>
			<P size="s">text s</P>
			<P>text m</P>
			<P size="l">text l</P>
			<Tag size="s"> small</Tag>
			<Tag size="m" color="red">
				red
			</Tag>
			<Tag size="s" color="green">
				green
			</Tag>
			<Tag color="primary">primary</Tag>
			<Rating rating={rating} isEditable setRating={setRating} />
			<ul>
				{menu.map((itemMenu) => (
					<li key={itemMenu._id.secondCategory}>{itemMenu._id.secondCategory}</li>
				))}
			</ul>
			<Input />
			<Textarea />
			<Search />
		</>
	);
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const firstCategory = 0;
	const { data: menu } = await axios.post<IMenuItem[]>(
		process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
		{
			firstCategory,
		}
	);

	return {
		props: {
			menu,
			firstCategory,
		},
	};
};

interface HomeProps extends Record<string, unknown> {
	menu: IMenuItem[];
	firstCategory: number;
}
