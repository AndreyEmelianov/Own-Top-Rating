import { PropsWithChildren, createContext, useState } from 'react';

import { IMenuItem } from '@/interfaces/menu.interface';
import { TopLevelCategory } from '@/interfaces/toppage.interface';

export interface IAppContext {
	menu: IMenuItem[];
	firstCategory: TopLevelCategory;
	setMenu?: (newMenu: IMenuItem[]) => void;
}

export const AppContext = createContext<IAppContext>({
	menu: [],
	firstCategory: TopLevelCategory.Courses,
});

export const AppContextProvider = ({
	menu,
	firstCategory,
	children,
}: PropsWithChildren<IAppContext>): JSX.Element => {
	const [menuState, setMenuState] = useState<IMenuItem[]>(menu);

	const setMenu = (newMenu: IMenuItem[]) => {
		setMenuState(newMenu);
	};

	return (
		<AppContext.Provider value={{ menu: menuState, firstCategory, setMenu }}>
			{children}
		</AppContext.Provider>
	);
};
