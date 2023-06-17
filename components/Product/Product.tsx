import cn from 'classnames';

import { IProductProps } from './Product.props';
import { Card } from '../Card/Card';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import { priceRu } from '@/helpers/helpers';
import { Button } from '../Button/Button';
import { Divider } from '../Divider/Divider';

import styles from './Product.module.css';

export const Product = ({ product, className, ...props }: IProductProps): JSX.Element => {
	return (
		// head продукта
		<Card className={styles.product}>
			<div className={styles.logo}>
				<img src={process.env.NEXT_PUBLIC_DOMAIN + product.image} alt={product.title} />
			</div>
			<div className={styles.title}>{product.title}</div>
			<div className={styles.price}>
				{priceRu(product.price)}
				{product.oldPrice && (
					<Tag className={styles.oldPrice} color="green">
						{priceRu(product.price - product.oldPrice)}
					</Tag>
				)}
			</div>
			<div className={styles.credit}>
				{priceRu(product.credit)}/<span className={styles.month}>мес</span>
			</div>
			<div className={styles.rating}>
				<Rating rating={product.reviewAvg ?? product.initialRating} />
			</div>
			<div className={styles.tags}>
				{product.categories.map((category) => (
					<Tag className={styles.category} color="ghost" key={category}>
						{category}
					</Tag>
				))}
			</div>
			<div className={styles.priceTitle}>цена</div>
			<div className={styles.creditTitle}>кредит</div>
			<div className={styles.rateTitle}>{product.reviewCount} отзывов</div>
			<Divider className={styles.hr} />

			{/* описание продукта */}
			<div className={styles.description}>{product.description}</div>

			{/* блок с фичами */}
			<div className={styles.feature}>фичи</div>

			{/* блок преимущества и недостатки */}
			<div className={styles.advBlock}>
				{product.advantages && (
					<div className={styles.advantages}>
						<div className={styles.advTitle}>Преимущества</div>
						<div>{product.advantages}</div>
					</div>
				)}
				{product.disadvantages && (
					<div className={styles.disadvantages}>
						<div className={styles.advTitle}>Недостатки</div>
						<div>{product.disadvantages}</div>
					</div>
				)}
			</div>
			<Divider className={styles.hr} />
			{/* блок экшенов */}
			<div className={styles.actions}>
				<Button appearance="primary">Узнать подробнее</Button>
				<Button appearance="ghost" arrow="right" className={styles.reviewBtn}>
					Читать отзывы
				</Button>
			</div>
		</Card>
	);
};
