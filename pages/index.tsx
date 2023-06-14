import { Button, Htag, P, Rating, Tag } from '@/components';
import { Layout } from '@/layout/Layout';
import { useState } from 'react';

export default function Home(): JSX.Element {
	const [rating, setRating] = useState<number>(4);

	return (
		<Layout>
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
		</Layout>
	);
}
