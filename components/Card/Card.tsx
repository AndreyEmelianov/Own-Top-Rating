import cn from 'classnames';

import { ICardProps } from './Card.props';

import styles from './Card.module.css';

export const Card = ({
	children,
	color = 'white',
	className,
	...props
}: ICardProps): JSX.Element => {
	return (
		<div
			className={cn(styles.card, className, {
				[styles.blue]: color == 'blue',
			})}
			{...props}
		>
			{children}
		</div>
	);
};
