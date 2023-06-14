import { FunctionComponent } from 'react';
import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import { ILayoutProps } from './Layout.props';
import { Sidebar } from './Sidebar/Sidebar';

const Layout = ({ children }: ILayoutProps): JSX.Element => {
	return (
		<>
			<Header />
			<main>
				<Sidebar />
				<div>{children}</div>
			</main>
			<Footer />
		</>
	);
};

export const withLayout = <T extends Record<string, unknown>>(
	Component: FunctionComponent<T>
) => {
	return function withLayoutComponent(props: T): JSX.Element {
		return (
			<Layout>
				<Component {...props} />
			</Layout>
		);
	};
};
