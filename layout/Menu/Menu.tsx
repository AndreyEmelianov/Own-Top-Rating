import { useContext } from 'react';
import cn from 'classnames';
import { format } from 'date-fns';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
	const router = useRouter();

	const openSecondLevelMenuHandler = (secondCategory: string) => {
		setMenu &&
			setMenu(
				menu.map((menuItem) => {
					if (menuItem._id.secondCategory == secondCategory) {
						menuItem.isOpened = !menuItem.isOpened;
					}
					return menuItem;
				})
			);
	};

	const buildFirstLevel = () => {
		return (
			<>
				{firstLevelMenu.map((menuItem) => (
					<div key={menuItem.route}>
						<Link href={`/${menuItem.route}`}>
							<div
								className={cn(styles.firstLevel, {
									[styles.firstLevelActive]: menuItem.id == firstCategory,
								})}
							>
								{menuItem.icon}
								<span>{menuItem.name}</span>
							</div>
						</Link>
						{menuItem.id == firstCategory && buildSecondLevel(menuItem)}
					</div>
				))}
			</>
		);
	};

	const buildSecondLevel = (menuItem: IFirstLevelMenuItem) => {
		return (
			<div className={styles.secondBlock}>
				{menu.map((menuCategory) => {
					if (
						menuCategory.pages
							.map((page) => page.alias)
							.includes(router.asPath.split('/')[2])
					) {
						menuCategory.isOpened = true;
					}

					return (
						<div key={menuCategory._id.secondCategory}>
							<div
								className={styles.secondLevel}
								onClick={() =>
									openSecondLevelMenuHandler(menuCategory._id.secondCategory)
								}
							>
								{menuCategory._id.secondCategory}
							</div>
							<div
								className={cn(styles.secondLevelBlock, {
									[styles.secondLevelBlockOpened]: menuCategory.isOpened,
								})}
							>
								{buildThirdLevel(menuCategory.pages, menuItem.route)}
							</div>
						</div>
					);
				})}
			</div>
		);
	};

	const buildThirdLevel = (pages: IPageItem[], route: string) => {
		return pages.map((page) => (
			<Link
				href={`/${route}/${page.alias}`}
				key={page._id}
				className={cn(styles.thirdLevel, {
					[styles.thirdLevelActive]: `/${route}/${page.alias}` == router.asPath,
				})}
			>
				{page.category}
			</Link>
		));
	};

	return <div className={styles.menu}>{buildFirstLevel()}</div>;
};
