import { useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef } from 'react';
import cn from 'classnames';

import { IRatingProps } from './Rating.props';
import StarIcon from './star.svg';

import styles from './Rating.module.css';

export const Rating = forwardRef(
	(
		{ isEditable = false, rating, setRating, ...props }: IRatingProps,
		ref: ForwardedRef<HTMLDivElement>
	): JSX.Element => {
		const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
			new Array(5).fill(<></>)
		);

		useEffect(() => {
			constructRating(rating);
		}, [rating]);

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
						>
							<StarIcon
								tabIndex={isEditable ? 0 : -1}
								onKeyDown={(event: KeyboardEvent<SVGAElement>) =>
									isEditable && handleSpace(index + 1, event)
								}
							/>
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

		const handleSpace = (index: number, event: KeyboardEvent<SVGAElement>) => {
			if (event.code !== 'Space' || !setRating) {
				return;
			}

			setRating(index);
		};

		return (
			<div {...props} ref={ref}>
				{ratingArray.map((element: JSX.Element, index: number) => (
					<span key={index}>{element}</span>
				))}
			</div>
		);
	}
);
