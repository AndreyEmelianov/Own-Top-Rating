import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import { ILayoutProps } from './Layout.props';
import { Sidebar } from './Sidebar/Sidebar';

export const Layout = ({ children }: ILayoutProps): JSX.Element => {
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
