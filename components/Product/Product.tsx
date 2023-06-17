import { useState } from 'react';
import cn from 'classnames';
import Image from 'next/image';

import { IProductProps } from './Product.props';
import { Card } from '../Card/Card';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import { declOfNum, priceRu } from '@/helpers/helpers';
import { Button } from '../Button/Button';
import { Divider } from '../Divider/Divider';
import { Reviews } from '../Reviews/Reviews';

import styles from './Product.module.css';
import { ReviewsForm } from '../ReviewsForm/ReviewsForm';

export const Product = ({ product, className, ...props }: IProductProps): JSX.Element => {
	const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);

	return (
		// блок карточки продукта
		// head продукта
		<>
			<Card className={styles.product}>
				<div className={styles.logo}>
					<Image
						src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
						alt={product.title}
						width={70}
						height={70}
					/>
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
				<div className={styles.rateTitle}>
					{product.reviewCount}
					{declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
				</div>
				<Divider className={styles.hr} />

				{/* описание продукта */}
				<div className={styles.description}>{product.description}</div>

				{/* блок с фичами */}
				<div className={styles.feature}>
					{product.characteristics.map((chararcteristic) => (
						<div className={styles.characteristics} key={chararcteristic.name}>
							<span className={styles.characteristicsName}>{chararcteristic.name}</span>
							<span className={styles.characteristicsDots}></span>
							<span className={styles.characteristicsValue}>{chararcteristic.value}</span>
						</div>
					))}
				</div>

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
				<Divider className={cn(styles.hr, styles.hr2)} />
				{/* блок экшенов */}
				<div className={styles.actions}>
					<Button appearance="primary">Узнать подробнее</Button>
					<Button
						appearance="ghost"
						arrow={isReviewOpened ? 'down' : 'right'}
						className={styles.reviewBtn}
						onClick={() => setIsReviewOpened(!isReviewOpened)}
					>
						Читать отзывы
					</Button>
				</div>
			</Card>

			{/* блок с формой отзывов */}
			<Card
				color="blue"
				className={cn(styles.reviews, {
					[styles.opened]: isReviewOpened,
					[styles.closed]: !isReviewOpened,
				})}
			>
				{product.reviews.map((review) => (
					<>
						<Reviews key={review._id} review={review} />
						<Divider />
					</>
				))}

				{/* сама форма */}
				<ReviewsForm productId={product._id} />
			</Card>
		</>
	);
};
