import { useContext } from 'react';
import cn from 'classnames';
import { format } from 'date-fns';

import { AppContext } from '@/context/app.context';
import { IFirstLevelMenuItem, IPageItem } from '@/interfaces/menu.interface';
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
							<div
								className={cn(styles.firstLevel, {
									[styles.firstLevelActive]: menuItem.id == firstCategory,
								})}
							>
								{menuItem.icon}
								<span>{menuItem.name}</span>
							</div>
						</a>
						{menuItem.id == firstCategory && buildSecondLevel(menuItem)}
					</div>
				))}
			</>
		);
	};

	const buildSecondLevel = (menuItem: IFirstLevelMenuItem) => {
		return (
			<div className={styles.secondBlock}>
				{menu.map((menuCategory) => (
					<div key={menuCategory._id.secondCategory}>
						<div className={styles.secondLevel}>{menuCategory._id.secondCategory}</div>
						<div
							className={cn(styles.secondLevelBlock, {
								[styles.secondLevelBlockOpened]: menuCategory.isOpened,
							})}
						>
							{buildThirdLevel(menuCategory.pages, menuItem.route)}
						</div>
					</div>
				))}
			</div>
		);
	};

	const buildThirdLevel = (pages: IPageItem[], route: string) => {
		return pages.map((page) => (
			<a
				key={page._id}
				href={`/${route}/${page.alias}`}
				className={cn(styles.thirdLevel, {
					[styles.thirdLevelActive]: false,
				})}
			>
				{page.category}
			</a>
		));
	};

	return <div className={styles.menu}>{buildFirstLevel()}</div>;
};
