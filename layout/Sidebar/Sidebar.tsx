import { ISidebarProps } from './Sidebar.props';
import cn from 'classnames';

import { Menu } from '../Menu/Menu';

import LogoIcon from '../logo.svg';
import styles from './Sidebar.module.css';

export const Sidebar = ({ className, ...props }: ISidebarProps): JSX.Element => {
	return (
		<div className={cn(className, styles.sidebar)} {...props}>
			<LogoIcon className={styles.logo} />
			<div>search</div>
			<Menu />
		</div>
	);
};
