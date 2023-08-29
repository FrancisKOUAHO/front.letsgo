import { FunctionComponent } from 'react';
import ButtonProps from '../../types/ButtonProps';

const Button: FunctionComponent<ButtonProps> = ({
	disabled,
	color = 'primary',
	size,
	isActive,
	minWidth = 112,
	minHeight = 42,
	w,
	onClick,
	children,
	type,
  style,
}) => {
	return (
		<button
			className={`c-button w-${w} c-button--${color} text-[${size}] ${
				isActive && `--is-active`
			} flex items-center justify-center`}
			style={{ minWidth: `${minWidth}px`, minHeight: `${minHeight}px`, ...style }}
			onClick={onClick}
			type={type}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;
