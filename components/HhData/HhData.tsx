import cn from 'classnames';

import { Card } from '../Card/Card';
import { IHhDataProps } from './HhData.props';

import styles from './HhData.module.css';

export const HhData = ({ count }: IHhDataProps): JSX.Element => {
	return (
		<div className={styles.hh}>
			<Card className={styles.count}>
				<div className={styles.title}>Всего Вакансий</div>
				<div className={styles.countCalue}>{count}</div>
			</Card>
		</div>
	);
};
