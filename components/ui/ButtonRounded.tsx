import { FunctionComponent } from 'react';
import ButtonRoundedProps from '../../types/ButtonRoundedProps';

const ButtonRounded: FunctionComponent<ButtonRoundedProps> = ({
	children,
	label,
	isActive,
	minWidth = 30,
	minHeight = 30,
	color = 'primary',
}) => {
	return (
		<button
			className={`c-buttonrounded-navigation c-button--${color} ${
				isActive && `--is-active`
			}`}
			style={{ minWidth: `${minWidth}px`, minHeight: `${minHeight}px` }}
		>
			{label}
			{children}
		</button>
	);
};

export default ButtonRounded;
