import { Advantages, Card, HhData, Htag, Tag } from '@/components';
import { ITopPageComponentProps } from './TopPageComponent.props';
import { TopLevelCategory } from '@/interfaces/toppage.interface';

import styles from './TopPageComponent.module.css';

export const TopPageComponent = ({
	page,
	products,
	firstCategory,
	...props
}: ITopPageComponentProps): JSX.Element => {
	return (
		<div className={styles.wrapper}>
			{/* шапка основного блока */}
			<div className={styles.title}>
				<Htag tag="h1">{page.title}</Htag>
				{products && (
					<Tag color="grey" size="m">
						{products.length}
					</Tag>
				)}
				<span>Sort</span>
			</div>

			{/* карточки продуктов */}
			<div>
				{products &&
					products.map((product) => <div key={product._id}>{product.title}</div>)}
			</div>

			{/* блок с вакансиями hh */}
			<div className={styles.hhTitle}>
				<Htag tag="h2">Вакансии - {page.category}</Htag>
				<Tag color="red" size="m">
					hh.ru
				</Tag>
			</div>

			{/* блок с карточками информации о вкансиях и зарплате */}
			{firstCategory == TopLevelCategory.Courses && page.hh && <HhData {...page.hh} />}

			{/* блок с преимуществами  */}

			{page.advantages && page.advantages.length > 0 && (
				<>
					<Htag tag="h2">Преимущества</Htag>
					<Advantages advantages={page.advantages} />
				</>
			)}
		</div>
	);
};
