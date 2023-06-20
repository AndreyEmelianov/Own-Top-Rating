import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import cn from 'classnames';
import axios from 'axios';

import { IReviewsFormProps } from './ReviewsForm.props';
import { Input } from '../Input/Input';
import { Rating } from '../Rating/Rating';
import { Textarea } from '../Textarea/Textarea';
import { Button } from '../Button/Button';
import { IReviewsForm, IReviewsSentResponse } from './ReviewsForm.interface';
import { API } from '@/helpers/api';

import CloseIcon from './close.svg';

import styles from './ReviewsForm.module.css';

export const ReviewsForm = ({
	productId,
	isOpened,
	className,
	...props
}: IReviewsFormProps): JSX.Element => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		reset,
		clearErrors,
	} = useForm<IReviewsForm>();

	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [isError, setIsError] = useState<string>();

	const onSubmit = async (formData: IReviewsForm) => {
		try {
			const { data } = await axios.post<IReviewsSentResponse>(API.review.createDemo, {
				...formData,
				productId,
			});

			if (data.message) {
				setIsSuccess(true);
				reset();
			} else {
				setIsError('Что-то пошло не так...');
			}
		} catch (e) {
			if (e instanceof Error) {
				setIsError(e.message);
			}
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={cn(styles.reviewForm, className)} {...props}>
				<Input
					placeholder="Имя"
					{...register('name', { required: { value: true, message: 'Заполните имя' } })}
					error={errors.name}
					tabIndex={isOpened ? 0 : -1}
					aria-invalid={errors.name ? true : false}
				/>
				<Input
					className={styles.title}
					placeholder="Заголовок отзыва"
					{...register('title', {
						required: { value: true, message: 'Заполните заголовок' },
					})}
					error={errors.title}
					tabIndex={isOpened ? 0 : -1}
					aria-invalid={errors.title ? true : false}
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
								tabIndex={isOpened ? 0 : -1}
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
					tabIndex={isOpened ? 0 : -1}
					aria-label="Текст отзыва"
					aria-invalid={errors.description ? true : false}
				/>

				{/* блок с кнопкой */}
				<div className={styles.submit}>
					<Button
						appearance="primary"
						tabIndex={isOpened ? 0 : -1}
						onClick={() => clearErrors()}
					>
						Отправить
					</Button>
					<span className={styles.info}>
						* Перед публикацией отзыв пройдет предварительную модерацию и проверку
					</span>
				</div>
			</div>

			{/* блок с оповещением об успешной отправки  */}
			{isSuccess && (
				<div className={cn(styles.success, styles.panel)} role="alert">
					<div className={styles.successTitle}>Ваш отзыв успешно отправлен</div>
					<div>Спасибо, ваш отзыв будет опубликован после проверки</div>
					<button
						onClick={() => setIsSuccess(false)}
						className={styles.close}
						aria-label="Закрыть оповещение"
					>
						<CloseIcon />
					</button>
				</div>
			)}

			{/* блок с ошибкой в отправке */}
			{isError && (
				<div className={cn(styles.error, styles.panel)} role="alert">
					Что-то пошло не так, попробуйте обновить страницу
					<button
						onClick={() => setIsError(undefined)}
						className={styles.close}
						aria-label="Закрыть оповещение"
					>
						<CloseIcon />
					</button>
				</div>
			)}
		</form>
	);
};
