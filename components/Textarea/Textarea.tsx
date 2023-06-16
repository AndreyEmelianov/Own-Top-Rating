import cn from 'classnames';

import { ITextareaProps } from './Textarea.props';

import styles from './Textarea.module.css';

export const Textarea = ({ className, ...props }: ITextareaProps): JSX.Element => {
	return <textarea className={cn(className, styles.input)} {...props} />;
};
