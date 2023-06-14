import { IHeaderProps } from './Header.props';

import styles from './Header.module.css';

export const Header = ({ ...props }: IHeaderProps): JSX.Element => {
	return <div {...props}>Header</div>;
};
