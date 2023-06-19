import { ForwardedRef, forwardRef, useRef, useState } from 'react';
import cn from 'classnames';
import Image from 'next/image';
import { motion } from 'framer-motion';

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

export const Product = motion(
	forwardRef(
		(
			{ product, className, ...props }: IProductProps,
			ref: ForwardedRef<HTMLDivElement>
		): JSX.Element => {
			const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);

			const reviewRef = useRef<HTMLDivElement>(null);

			const variants = {
				visible: { opacity: 1, height: 'auto' },
				hidden: { opacity: 0, height: 0 },
			};

			const scrollToReview = () => {
				setIsReviewOpened(true);
				reviewRef.current?.scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				});
			};

			return (
				// блок карточки продукта
				// head продукта
				<div className={className} {...props} ref={ref}>
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
							<a href="#ref" onClick={scrollToReview}>
								{product.reviewCount}
								{declOfNum(product.reviewCount, [' отзыв', ' отзыва', ' отзывов'])}
							</a>
						</div>
						<Divider className={styles.hr} />

						{/* описание продукта */}
						<div className={styles.description}>{product.description}</div>

						{/* блок с фичами */}
						<div className={styles.feature}>
							{product.characteristics.map((chararcteristic) => (
								<div className={styles.characteristics} key={chararcteristic.name}>
									<span className={styles.characteristicsName}>
										{chararcteristic.name}
									</span>
									<span className={styles.characteristicsDots}></span>
									<span className={styles.characteristicsValue}>
										{chararcteristic.value}
									</span>
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
					<motion.div
						animate={isReviewOpened ? 'visible' : 'hidden'}
						variants={variants}
						initial="hidden"
					>
						<Card
							color="blue"
							className={cn(styles.reviews, {
								[styles.opened]: isReviewOpened,
								[styles.closed]: !isReviewOpened,
							})}
							ref={reviewRef}
						>
							{product.reviews.map((review) => (
								<div key={review._id}>
									<Reviews review={review} />
									<Divider />
								</div>
							))}

							{/* сама форма */}
							<ReviewsForm productId={product._id} />
						</Card>
					</motion.div>
				</div>
			);
		}
	)
);
