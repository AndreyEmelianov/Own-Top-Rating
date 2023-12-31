import { ForwardedRef, forwardRef } from 'react';
import cn from 'classnames';

import { ITextareaProps } from './Textarea.props';

import styles from './Textarea.module.css';

export const Textarea = forwardRef(
	(
		{ error, className, ...props }: ITextareaProps,
		ref: ForwardedRef<HTMLTextAreaElement>
	): JSX.Element => {
		return (
			<div className={cn(styles.textareaWrapper, className)}>
				<textarea
					className={cn(styles.textarea, {
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
