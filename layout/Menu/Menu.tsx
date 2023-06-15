import { useContext } from 'react';
import cn from 'classnames';
import { format } from 'date-fns';

import { AppContext } from '@/context/app.context';

import styles from './Menu.module.css';

export const Menu = (): JSX.Element => {
	const { menu, setMenu, firstCategory } = useContext(AppContext);

	return (
		<div>
			<ul>
				{menu.map((menuItem) => (
					<li key={menuItem._id.secondCategory}>{menuItem._id.secondCategory}</li>
				))}
			</ul>
		</div>
	);
};
