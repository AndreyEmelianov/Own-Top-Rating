import { IButtonIconProps, icons } from './ButtonIcon.props';
import cn from 'classnames';

import styles from './ButtonIcon.module.css';

export const ButtonIcon = ({
	appearance,
	icon,
	className,

	...props
}: IButtonIconProps): JSX.Element => {
	const IconComponent = icons[icon];

	return (
		<button
			className={cn(styles.button, className, {
				[styles.primary]: appearance == 'primary',
				[styles.white]: appearance == 'white',
			})}
			{...props}
		>
			<IconComponent />
		</button>
	);
};
