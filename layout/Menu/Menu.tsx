import { useContext, KeyboardEvent, useState } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, useReducedMotion } from 'framer-motion';

import { firstLevelMenu } from '@/helpers/helpers';
import { AppContext } from '@/context/app.context';
import { IFirstLevelMenuItem, IPageItem } from '@/interfaces/menu.interface';

import styles from './Menu.module.css';

export const Menu = (): JSX.Element => {
	const { menu, setMenu, firstCategory } = useContext(AppContext);
	const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>();
	const shouldReduceMotion = useReducedMotion();
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
		hidden: { opacity: shouldReduceMotion ? 1 : 0, height: 0 },
	};

	const openSecondLevelMenuHandler = (secondCategory: string) => {
		setMenu &&
			setMenu(
				menu.map((menuItem) => {
					if (menuItem._id.secondCategory == secondCategory) {
						setAnnounce(menuItem.isOpened ? 'closed' : 'opened');
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
			<ul className={styles.firstLevelList}>
				{firstLevelMenu.map((menuItem) => (
					<li key={menuItem.route} aria-expanded={menuItem.id == firstCategory}>
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
					</li>
				))}
			</ul>
		);
	};

	const buildSecondLevel = (menuItem: IFirstLevelMenuItem) => {
		return (
			<ul className={styles.secondBlock}>
				{menu.map((menuCategory) => {
					if (
						menuCategory.pages
							.map((page) => page.alias)
							.includes(router.asPath.split('/')[2])
					) {
						menuCategory.isOpened = true;
					}

					return (
						<li key={menuCategory._id.secondCategory}>
							<button
								onKeyDown={(key: KeyboardEvent) =>
									openSecondLevelMenuKey(key, menuCategory._id.secondCategory)
								}
								className={styles.secondLevel}
								onClick={() =>
									openSecondLevelMenuHandler(menuCategory._id.secondCategory)
								}
								aria-expanded={menuCategory.isOpened}
							>
								{menuCategory._id.secondCategory}
							</button>
							<motion.ul
								layout
								variants={variants}
								initial={menuCategory.isOpened ? 'visible' : 'hidden'}
								animate={menuCategory.isOpened ? 'visible' : 'hidden'}
								className={styles.secondLevelBlock}
							>
								{buildThirdLevel(
									menuCategory.pages,
									menuItem.route,
									menuCategory.isOpened ?? false
								)}
							</motion.ul>
						</li>
					);
				})}
			</ul>
		);
	};

	const buildThirdLevel = (pages: IPageItem[], route: string, isOpened: boolean) => {
		return pages.map((page) => (
			<motion.li key={page._id} variants={variantsChildren}>
				<Link
					tabIndex={isOpened ? 0 : -1}
					href={`/${route}/${page.alias}`}
					className={cn(styles.thirdLevel, {
						[styles.thirdLevelActive]: `/${route}/${page.alias}` == router.asPath,
					})}
					aria-current={`/${route}/${page.alias}` == router.asPath ? 'page' : false}
				>
					{page.category}
				</Link>
			</motion.li>
		));
	};

	return (
		<nav className={styles.menu} role="navigation">
			{announce && (
				<span className="visualyHidden" role="log">
					{announce == 'opened' ? 'развёрнуто' : 'свёрнуто'}
				</span>
			)}
			{buildFirstLevel()}
		</nav>
	);
};
