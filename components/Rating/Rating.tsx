import {
	useEffect,
	useState,
	KeyboardEvent,
	forwardRef,
	ForwardedRef,
	useRef,
} from 'react';
import cn from 'classnames';

import { IRatingProps } from './Rating.props';
import StarIcon from './star.svg';

import styles from './Rating.module.css';

export const Rating = forwardRef(
	(
		{ isEditable = false, rating, setRating, error, tabIndex, ...props }: IRatingProps,
		ref: ForwardedRef<HTMLDivElement>
	): JSX.Element => {
		const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
			new Array(5).fill(<></>)
		);

		const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

		useEffect(() => {
			constructRating(rating);
		}, [rating, tabIndex]);

		const computeFocus = (rating: number, index: number): number => {
			if (!isEditable) {
				return -1;
			}

			if (!rating && index == 0) {
				return tabIndex ?? 0;
			}

			if (rating == index + 1) {
				return tabIndex ?? 0;
			}

			return -1;
		};

		const constructRating = (currentRating: number) => {
			const updatedRatingArray = ratingArray.map(
				(element: JSX.Element, index: number) => {
					return (
						<span
							key={index}
							className={cn(styles.star, {
								[styles.filled]: index < currentRating,
								[styles.editable]: isEditable,
							})}
							onMouseEnter={() => changeDisplayHandler(index + 1)}
							onMouseLeave={() => changeDisplayHandler(rating)}
							onClick={() => onRatingClick(index + 1)}
							tabIndex={computeFocus(rating, index)}
							onKeyDown={handleKey}
							ref={(r) => ratingArrayRef.current?.push(r)}
							role={isEditable ? 'slider' : ''}
							aria-invalid={error ? true : false}
							aria-valuenow={rating}
							aria-valuemax={5}
							aria-label={isEditable ? 'Укажите рейтинг' : 'рейтинг' + rating}
							aria-valuemin={1}
						>
							<StarIcon />
						</span>
					);
				}
			);

			setRatingArray(updatedRatingArray);
		};

		const changeDisplayHandler = (index: number) => {
			if (!isEditable) {
				return;
			}

			constructRating(index);
		};

		const onRatingClick = (index: number) => {
			if (!isEditable || !setRating) {
				return;
			}

			setRating(index);
		};

		const handleKey = (event: KeyboardEvent) => {
			if (!isEditable || !setRating) {
				return;
			}

			if (event.code == 'ArrowRight' || event.code == 'ArrowUp') {
				if (!rating) {
					setRating(1);
				} else {
					event.preventDefault();
					setRating(rating < 5 ? rating + 1 : 5);
				}

				ratingArrayRef.current[rating]?.focus();
			}

			if (event.code == 'ArrowLeft' || event.code == 'ArrowDown') {
				event.preventDefault();
				setRating(rating > 1 ? rating - 1 : 1);
				ratingArrayRef.current[rating - 2]?.focus();
			}
		};

		return (
			<div
				{...props}
				ref={ref}
				className={cn(styles.ratingWrapper, {
					[styles.error]: error,
				})}
			>
				{ratingArray.map((element: JSX.Element, index: number) => (
					<span key={index}>{element}</span>
				))}
				{error && (
					<span role="alert" className={styles.errorMessage}>
						{error.message}
					</span>
				)}
			</div>
		);
	}
);
