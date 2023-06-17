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
	className,
	...props
}: IReviewsFormProps): JSX.Element => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		reset,
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
			{isSuccess && (
				<div className={cn(styles.success, styles.panel)}>
					<div className={styles.successTitle}>Ваш отзыв успешно отправлен</div>
					<div>Спасибо, ваш отзыв будет опубликован после проверки</div>
					<CloseIcon className={styles.close} onClick={() => setIsSuccess(false)} />
				</div>
			)}

			{/* блок с ошибкой в отправке */}
			{isError && (
				<div className={cn(styles.error, styles.panel)}>
					Что-то пошло не так, попробуйте обновить страницу
					<CloseIcon className={styles.close} onClick={() => setIsError(undefined)} />
				</div>
			)}
		</form>
	);
};
