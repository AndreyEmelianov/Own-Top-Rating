import { useContext } from 'react';
import cn from 'classnames';
import { format } from 'date-fns';

import { AppContext } from '@/context/app.context';
import { IFirstLevelMenuItem } from '@/interfaces/menu.interface';
import { TopLevelCategory } from '@/interfaces/toppage.interface';

import CoursesIcon from './icons/courses.svg';
import ServicesIcon from './icons/services.svg';
import BooksIcon from './icons/books.svg';
import ProductsIcon from './icons/product.svg';

import styles from './Menu.module.css';

const firstLevelMenu: IFirstLevelMenuItem[] = [
	{
		route: 'courses',
		name: 'Курсы',
		icon: <CoursesIcon />,
		id: TopLevelCategory.Courses,
	},
	{
		route: 'services',
		name: 'Сервисы',
		icon: <ServicesIcon />,
		id: TopLevelCategory.Services,
	},
	{
		route: 'books',
		name: 'Книги',
		icon: <BooksIcon />,
		id: TopLevelCategory.Books,
	},
	{
		route: 'products',
		name: 'Продукты',
		icon: <ProductsIcon />,
		id: TopLevelCategory.Products,
	},
];

export const Menu = (): JSX.Element => {
	const { menu, setMenu, firstCategory } = useContext(AppContext);

	const buildFirstLevel = () => {
		return (
			<>
				{firstLevelMenu.map((menuItem) => (
					<div key={menuItem.route}>
						<a href={`/${menuItem.route}`}>
							<div>
								{menuItem.icon}
								<span
									className={cn(styles.firstLevel, {
										[styles.firstLevelActive]: menuItem.id == firstCategory,
									})}
								>
									{menuItem.name}
								</span>
							</div>
						</a>
					</div>
				))}
			</>
		);
	};

	const buildSecondLevel = () => {};

	const buildThirdLevel = () => {};

	return <div className={styles.menu}>{buildFirstLevel()}</div>;
};
