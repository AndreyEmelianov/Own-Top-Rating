import { ForwardedRef, forwardRef } from 'react';
import cn from 'classnames';

import { ICardProps } from './Card.props';

import styles from './Card.module.css';

export const Card = forwardRef(
	(
		{ children, color = 'white', className, ...props }: ICardProps,
		ref: ForwardedRef<HTMLDivElement>
	): JSX.Element => {
		return (
			<div
				className={cn(styles.card, className, {
					[styles.blue]: color == 'blue',
				})}
				ref={ref}
				{...props}
			>
				{children}
			</div>
		);
	}
);
