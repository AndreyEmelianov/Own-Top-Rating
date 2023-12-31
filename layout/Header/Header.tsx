import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import cn from 'classnames';

import { IHeaderProps } from './Header.props';

import LogoIcon from '../logo.svg';

import styles from './Header.module.css';
import { ButtonIcon } from '@/components/ButtonIcon/ButtonIcon';
import { Sidebar } from '../Sidebar/Sidebar';

export const Header = ({ className, ...props }: IHeaderProps): JSX.Element => {
	const [isOpened, setIsOpened] = useState<boolean>(false);

	const router = useRouter();

	useEffect(() => {
		setIsOpened(false);
	}, [router]);

	const variants = {
		opened: {
			opacity: 1,
			x: 0,
			transition: {
				stiffness: 20,
			},
		},
		closed: {
			opacity: 0,
			x: '100%',
		},
	};

	return (
		<header className={cn(className, styles.header)} {...props}>
			<LogoIcon />
			<ButtonIcon appearance="white" icon="menu" onClick={() => setIsOpened(true)} />
			<motion.div
				className={styles.mobileMenu}
				variants={variants}
				initial={'closed'}
				animate={isOpened ? 'opened' : 'closed'}
			>
				<Sidebar />
				<ButtonIcon
					className={styles.menuClose}
					appearance="white"
					icon="close"
					onClick={() => setIsOpened(false)}
				/>
			</motion.div>
		</header>
	);
};
