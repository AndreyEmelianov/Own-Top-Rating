import cn from 'classnames';

import { ISortProps, SortEnum } from './Sort.props';

import SortIcon from './sort.svg';

import styles from './Sort.module.css';

export const Sort = ({ sort, setSort, className, ...props }: ISortProps): JSX.Element => {
	return (
		<div className={cn(styles.sort, className)} {...props}>
			<div className={styles.sortName} id="sort">
				Сортировка
			</div>
			<button
				id="rating"
				onClick={() => setSort(SortEnum.Rating)}
				className={cn({
					[styles.active]: sort == SortEnum.Rating,
				})}
				aria-selected={sort == SortEnum.Rating}
				aria-labelledby="sort rating"
			>
				<SortIcon className={styles.sortIcon} />
				По рейтингу
			</button>

			{/* сортировка по цене */}
			<button
				id="price"
				onClick={() => setSort(SortEnum.Price)}
				className={cn({
					[styles.active]: sort == SortEnum.Price,
				})}
				aria-selected={sort == SortEnum.Price}
				aria-labelledby="sort price"
			>
				<SortIcon className={styles.sortIcon} />
				По цене
			</button>
		</div>
	);
};
