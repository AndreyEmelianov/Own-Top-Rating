import cn from 'classnames';

import { IProductProps } from './Product.props';
import { Card } from '../Card/Card';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';

import styles from './Product.module.css';
import { Button } from '../Button/Button';

export const Product = ({ product, className, ...props }: IProductProps): JSX.Element => {
	return (
		// head продукта
		<Card className={styles.product}>
			<div className={styles.logo}>
				<img src={process.env.NEXT_PUBLIC_DOMAIN + product.image} alt={product.title} />
			</div>
			<div className={styles.title}>{product.title}</div>
			<div className={styles.price}>{product.price}</div>
			<div className={styles.credit}>{product.credit}</div>
			<div className={styles.rating}>
				<Rating rating={product.reviewAvg ?? product.initialRating} />
			</div>
			<div className={styles.tags}>
				{product.categories.map((category) => (
					<Tag color="ghost" key={category}>
						{category}
					</Tag>
				))}
			</div>
			<div className={styles.priceTitle}>цена</div>
			<div className={styles.creditTitle}>кредит</div>
			<div className={styles.rateTitle}>{product.reviewCount} отзывов</div>
			<div className={styles.hr}>
				<hr className={styles.hr} />
			</div>

			{/* описание продукта */}
			<div className={styles.description}>{product.description}</div>

			{/* блок с фичами */}
			<div className={styles.feature}>фичи</div>

			{/* блок преимущества и недостатки */}
			<div className={styles.advBlock}>
				<div className={styles.advantages}>
					<div>Преимущества</div>
					<div>{product.advantages}</div>
				</div>
				<div className={styles.disadvantages}>
					<div>Недостатки</div>
					<div>{product.disadvantages}</div>
				</div>
			</div>
			<div className={styles.hr}>
				<hr />
			</div>
			{/* блок экшенов */}
			<div className={styles.actions}>
				<Button appearance="primary">Узнать подробнее</Button>
				<Button appearance="ghost" arrow="right">
					Читать отзывы
				</Button>
			</div>
		</Card>
	);
};
