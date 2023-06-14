import { ISidebarProps } from './Sidebar.props';

import styles from './Sidebar.module.css';

export const Sidebar = ({ ...props }: ISidebarProps): JSX.Element => {
	return <div {...props}>Sidebar</div>;
};
