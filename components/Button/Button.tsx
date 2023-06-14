import { IButtonProps } from './Button.props';

import cn from 'classnames';

import styles from './Button.module.css';

export const Button = ({ appearance, children }: IButtonProps): JSX.Element => {
	return (
		<button
			className={cn(styles.button, {
				[styles.primary]: appearance == 'primary',
				[styles.ghost]: appearance == 'ghost',
			})}
		>
			{children}
		</button>
	);
};
