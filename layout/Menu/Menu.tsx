import { useContext, KeyboardEvent } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import { firstLevelMenu } from '@/helpers/helpers';
import { AppContext } from '@/context/app.context';
import { IFirstLevelMenuItem, IPageItem } from '@/interfaces/menu.interface';

import styles from './Menu.module.css';

export const Menu = (): JSX.Element => {
	const { menu, setMenu, firstCategory } = useContext(AppContext);
	const router = useRouter();

	const variants = {
		visible: {
			marginBottom: 10,
			transition: {
				when: 'beforeChildren',
				staggerChildren: 0.1,
			},
		},
		hidden: { marginBottom: 0 },
	};

	const variantsChildren = {
		visible: {
			opacity: 1,
			height: 40,
		},
		hidden: { opacity: 0, height: 0 },
	};

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

	const openSecondLevelMenuKey = (key: KeyboardEvent, secondCategory: string) => {
		if (key.code == 'Space' || key.code == 'Enter') {
			key.preventDefault();
			openSecondLevelMenuHandler(secondCategory);
		}
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
								tabIndex={0}
								onKeyDown={(key: KeyboardEvent) =>
									openSecondLevelMenuKey(key, menuCategory._id.secondCategory)
								}
								className={styles.secondLevel}
								onClick={() =>
									openSecondLevelMenuHandler(menuCategory._id.secondCategory)
								}
							>
								{menuCategory._id.secondCategory}
							</div>
							<motion.div
								layout
								variants={variants}
								initial={menuCategory.isOpened ? 'visible' : 'hidden'}
								animate={menuCategory.isOpened ? 'visible' : 'hidden'}
								className={cn(styles.secondLevelBlock)}
							>
								{buildThirdLevel(
									menuCategory.pages,
									menuItem.route,
									menuCategory.isOpened ?? false
								)}
							</motion.div>
						</div>
					);
				})}
			</div>
		);
	};

	const buildThirdLevel = (pages: IPageItem[], route: string, isOpened: boolean) => {
		return pages.map((page) => (
			<motion.div key={page._id} variants={variantsChildren}>
				<Link
					tabIndex={isOpened ? 0 : -1}
					href={`/${route}/${page.alias}`}
					className={cn(styles.thirdLevel, {
						[styles.thirdLevelActive]: `/${route}/${page.alias}` == router.asPath,
					})}
				>
					{page.category}
				</Link>
			</motion.div>
		));
	};

	return <div className={styles.menu}>{buildFirstLevel()}</div>;
};
