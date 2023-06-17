import { ForwardedRef, forwardRef } from 'react';
import cn from 'classnames';

import { ITextareaProps } from './Textarea.props';

import styles from './Textarea.module.css';

export const Textarea = forwardRef(
	(
		{ className, ...props }: ITextareaProps,
		ref: ForwardedRef<HTMLTextAreaElement>
	): JSX.Element => {
		return <textarea className={cn(className, styles.input)} {...props} ref={ref} />;
	}
);
