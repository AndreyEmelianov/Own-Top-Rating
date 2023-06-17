import { ForwardedRef, forwardRef } from 'react';
import cn from 'classnames';

import { IInputProps } from './Input.props';

import styles from './Input.module.css';

export const Input = forwardRef(
	(
		{ className, ...props }: IInputProps,
		ref: ForwardedRef<HTMLInputElement>
	): JSX.Element => {
		return <input className={cn(className, styles.input)} {...props} ref={ref} />;
	}
);
