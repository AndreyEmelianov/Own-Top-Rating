import { useRouter } from 'next/router';
import { useState, KeyboardEvent } from 'react';
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
		<form className={cn(className, styles.search)} {...props} role="search">
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
				aria-label="Искать по сайту"
			>
				<SearchIcon />
			</Button>
		</form>
	);
};
