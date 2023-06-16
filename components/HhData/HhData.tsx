import cn from 'classnames';

import { priceRu } from '@/helpers/helpers';
import { Card } from '../Card/Card';
import { IHhDataProps } from './HhData.props';

import RateIcon from './rate.svg';

import styles from './HhData.module.css';

export const HhData = ({
	count,
	juniorSalary,
	middleSalary,
	seniorSalary,
}: IHhDataProps): JSX.Element => {
	return (
		<div className={styles.hh}>
			{/* карточка всего вакансий */}
			<Card className={styles.count}>
				<div className={styles.title}>Всего Вакансий</div>
				<div className={styles.countValue}>{count}</div>
			</Card>

			{/* карточки с информацией о зарплате */}
			<Card className={styles.salary}>
				{/* первый блок */}
				<div>
					<div className={styles.title}>Начальный</div>
					<div className={styles.salaryValue}>{priceRu(juniorSalary)}</div>
					<div className={styles.rate}>
						<RateIcon className={styles.filled} />
						<RateIcon />
						<RateIcon />
					</div>
				</div>
				{/* второй блок */}
				<div>
					<div className={styles.title}>Средний</div>
					<div className={styles.salaryValue}>{priceRu(middleSalary)}</div>
					<div className={styles.rate}>
						<RateIcon className={styles.filled} />
						<RateIcon className={styles.filled} />
						<RateIcon />
					</div>
				</div>
				{/* третий блок */}
				<div>
					<div className={styles.title}>Профессионал</div>
					<div className={styles.salaryValue}>{priceRu(seniorSalary)}</div>
					<div className={styles.rate}>
						<RateIcon className={styles.filled} />
						<RateIcon className={styles.filled} />
						<RateIcon className={styles.filled} />
					</div>
				</div>
			</Card>
		</div>
	);
};
