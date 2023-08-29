import React, { CSSProperties } from 'react';

type ButtonProps = {
	color?: any;
	isActive?: boolean;
	minWidth?: number;
	minHeight?: number;
	size?: string;
	onClick?: any;
	w?: string;
	children?: React.ReactNode;
	type?: 'button' | 'submit' | 'reset' | undefined;
	disabled?: boolean,
  style?: CSSProperties,
};

export default ButtonProps;
