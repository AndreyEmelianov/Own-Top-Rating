import cn from 'classnames';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import { IReviewsProps } from './Reviews.props';
import { Rating } from '../Rating/Rating';

import UserIcon from './user.svg';

import styles from './Reviews.module.css';

export const Reviews = ({ review, className, ...props }: IReviewsProps): JSX.Element => {
	const { name, title, description, createdAt, rating } = review;

	return (
		<div className={cn(styles.review, className)} {...props}>
			{/* блок с информацией о юзере */}
			<UserIcon className={styles.user} />
			<div className={styles.title}>
				<span className={styles.name}>{name}:</span>&nbsp;&nbsp;
				<span>{title}:</span>
			</div>

			{/* блок с датой */}
			<div className={styles.date}>
				{format(new Date(createdAt), 'dd MMMM yyyy', { locale: ru })}
			</div>

			{/* блок с рейтингом */}
			<div className={styles.rating}>
				<Rating rating={rating} />
			</div>

			{/* блок с описанием */}
			<div className={styles.description}>{description}</div>
		</div>
	);
};
