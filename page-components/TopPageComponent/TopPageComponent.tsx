import { Htag } from '@/components';
import { ITopPageComponentProps } from './TopPageComponent.props';

export const TopPageComponent = ({
	page,
	products,
	firstCategory,
	...props
}: ITopPageComponentProps): JSX.Element => {
	return (
		<>
			<div>
				<Htag />
			</div>
			{products && products.length}
		</>
	);
};
