import { useRouter } from 'next/router';
import { useState } from 'react';
import cn from 'classnames';

import { ISearchProps } from './Search.props';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

import SearchIcon from './search.svg';

import styles from './Search.module.css';

export const Search = ({ className, ...props }: ISearchProps): JSX.Element => {
	const [search, setSearch] = useState<string>('');

	const router = useRouter();

	const goToSearch = () => {
		router.push({
			pathname: '/search',
			query: {
				q: search,
			},
		});
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key == 'Enter') {
			goToSearch();
		}
	};

	return (
		<div className={cn(className, styles.search)} {...props}>
			<Input
				className={styles.input}
				placeholder="Поиск..."
				value={search}
				onChange={(event) => setSearch(event.target.value)}
			/>
			<Button
				appearance="primary"
				className={styles.button}
				onClick={goToSearch}
				onKeyDown={handleKeyDown}
			>
				<SearchIcon />
			</Button>
		</div>
	);
};
