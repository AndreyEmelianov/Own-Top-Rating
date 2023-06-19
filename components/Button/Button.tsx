import { IButtonProps } from './Button.props';
import cn from 'classnames';
import { motion } from 'framer-motion';

import ArrowIcon from './arrow.svg';

import styles from './Button.module.css';

export const Button = ({
	appearance,
	children,
	className,
	arrow = 'none',
	...props
}: IButtonProps): JSX.Element => {
	return (
		<motion.button
			whileHover={{ scale: 1.05 }}
			className={cn(styles.button, className, {
				[styles.primary]: appearance == 'primary',
				[styles.ghost]: appearance == 'ghost',
			})}
			{...props}
		>
			{children}
			{arrow !== 'none' && (
				<span
					className={cn(styles.arrow, {
						[styles.down]: arrow == 'down',
					})}
				>
					<ArrowIcon />
				</span>
			)}
		</motion.button>
	);
};
