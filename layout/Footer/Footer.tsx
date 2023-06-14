import { IFooterProps } from './Footer.props';

import styles from './Footer.module.css';

export const Footer = ({ ...props }: IFooterProps): JSX.Element => {
	return <div {...props}>Footer</div>;
};
