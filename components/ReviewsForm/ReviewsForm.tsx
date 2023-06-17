import { useForm, Controller } from 'react-hook-form';
import cn from 'classnames';

import { IReviewsFormProps } from './ReviewsForm.props';
import { Input } from '../Input/Input';
import { Rating } from '../Rating/Rating';
import { Textarea } from '../Textarea/Textarea';
import { Button } from '../Button/Button';
import { IReviewsForm } from './ReviewsForm.interface';

import CloseIcon from './close.svg';
import styles from './ReviewsForm.module.css';

export const ReviewsForm = ({
	productId,
	className,
	...props
}: IReviewsFormProps): JSX.Element => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IReviewsForm>();

	const onSubmit = (data: IReviewsForm) => {
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={cn(styles.reviewForm, className)} {...props}>
				<Input
					placeholder="Имя"
					{...register('name', { required: { value: true, message: 'Заполните имя' } })}
					error={errors.name}
				/>
				<Input
					className={styles.title}
					placeholder="Заголовок отзыва"
					{...register('title', {
						required: { value: true, message: 'Заполните заголовок' },
					})}
					error={errors.title}
				/>

				{/* блок с оценкой */}
				<div className={styles.rating}>
					<span>Оценка:</span>
					<Controller
						control={control}
						name="rating"
						rules={{ required: { value: true, message: 'Укажите рейтинг' } }}
						render={({ field }) => (
							<Rating
								rating={field.value}
								isEditable
								ref={field.ref}
								setRating={field.onChange}
								error={errors.rating}
							/>
						)}
					/>
				</div>

				{/* текст ареа */}
				<Textarea
					className={styles.description}
					placeholder="Текст отзыва"
					{...register('description', {
						required: { value: true, message: 'Заполните описание' },
					})}
					error={errors.description}
				/>

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
		</form>
	);
};
