import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import up from './up.svg';
import close from './close.svg';
import menu from './menu.svg';

export const icons = {
	up,
	close,
	menu,
};

export type IconName = keyof typeof icons;

export interface IButtonIconProps
	extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	appearance: 'primary' | 'white';
	icon: IconName;
}
