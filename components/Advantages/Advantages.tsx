import { IAdvantagesProps } from './Advantages.props';

import CheckIcon from './check.svg';

import styles from './Advantages.module.css';

export const Advantages = ({ advantages }: IAdvantagesProps): JSX.Element => {
	return (
		<>
			{advantages.map((advantage) => (
				<div key={advantage._id} className={styles.advantage}>
					<CheckIcon />
					<div className={styles.title}>{advantage.title}</div>
					<hr className={styles.vline} />
					<div>{advantage.description}</div>
				</div>
			))}
		</>
	);
};
