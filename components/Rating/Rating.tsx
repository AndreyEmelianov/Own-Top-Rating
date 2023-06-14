import { useEffect, useState } from 'react';
import cn from 'classnames';

import { IRatingProps } from './Rating.props';
import StarIcon from './star.svg';

import styles from './Rating.module.css';

export const Rating = ({
	isEditable = false,
	rating,
	setRating,
	...props
}: IRatingProps): JSX.Element => {
	const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

	useEffect(() => {
		constructRating(rating);
	}, [rating]);

	const constructRating = (currentRating: number) => {
		const updatedRatingArray = ratingArray.map((element: JSX.Element, index: number) => {
			return (
				<StarIcon
					key={index}
					className={cn(styles.star, {
						[styles.filled]: index < currentRating,
					})}
				/>
			);
		});

		setRatingArray(updatedRatingArray);
	};

	return (
		<div {...props}>
			{ratingArray.map((element: JSX.Element, index: number) => (
				<span key={index}>{element}</span>
			))}
		</div>
	);
};
