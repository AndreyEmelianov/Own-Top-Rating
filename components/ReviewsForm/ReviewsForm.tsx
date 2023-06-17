import cn from 'classnames';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import { IReviewsFormProps } from './ReviewsForm.props';
import { Input } from '../Input/Input';
import { Rating } from '../Rating/Rating';
import { Textarea } from '../Textarea/Textarea';
import { Button } from '../Button/Button';
import CloseIcon from './close.svg';

import styles from './ReviewsForm.module.css';

export const ReviewsForm = ({
	productId,
	className,
	...props
}: IReviewsFormProps): JSX.Element => {
	return (
		<>
			<div className={cn(styles.reviewForm, className)} {...props}>
				<Input placeholder="Имя" />
				<Input className={styles.title} placeholder="Заголовок отзыва" />

				{/* блок с оценкой */}
				<div className={styles.rating}>
					<span>Оценка:</span>
					<Rating rating={0} />
				</div>

				{/* текст ареа */}
				<Textarea className={styles.description} placeholder="Текст отзыва" />

				{/* блок с кнопкой */}
				<div className={styles.submit}>
					<Button appearance="primary">Отправить</Button>
					<span className={styles.info}>
						* Перед публикацией отзыв пройдет предварительную модерацию и проверку
					</span>
				</div>
			</div>

			{/* блок с оповещением об успешной отправки  */}
			<div className={styles.success}>
				<div className={styles.successTitle}>Ваш отзыв успешно отправлен</div>
				<div>Спасибо, ваш отзыв будет опубликован после проверки</div>
				<CloseIcon className={styles.close} />
			</div>
		</>
	);
};
