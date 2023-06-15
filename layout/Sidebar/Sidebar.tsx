import { ISidebarProps } from './Sidebar.props';

import { Menu } from '../Menu/Menu';
 
import styles from './Sidebar.module.css';

export const Sidebar = ({ ...props }: ISidebarProps): JSX.Element => {
	return (
		<div {...props}>
			<Menu />
		</div>
	);
};
