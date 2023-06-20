import { ForwardedRef, forwardRef } from 'react';
import cn from 'classnames';

import { IInputProps } from './Input.props';

import styles from './Input.module.css';

export const Input = forwardRef(
	(
		{ error, className, ...props }: IInputProps,
		ref: ForwardedRef<HTMLInputElement>
	): JSX.Element => {
		return (
			<div className={cn(styles.inputWrapper, className)}>
				<input
					className={cn(styles.input, {
						[styles.error]: error,
					})}
					{...props}
					ref={ref}
				/>
				{error && (
					<span role="alert" className={styles.errorMessage}>
						{error.message}
					</span>
				)}
			</div>
		);
	}
);
