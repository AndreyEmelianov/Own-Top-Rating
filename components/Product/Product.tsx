import cn from 'classnames';

import { IProductProps } from './Product.props';

import styles from './Product.module.css';

export const Product = ({ product, className, ...props }: IProductProps): JSX.Element => {
	return <div>{product.title}</div>;
};
