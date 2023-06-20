import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IReviewsFormProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	productId: string;
	isOpened: boolean;
}
