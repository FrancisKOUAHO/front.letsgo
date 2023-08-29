import { FunctionComponent } from 'react';
import InputProps from '../../types/InputProps';

const Input: FunctionComponent<InputProps> = ({
	name,
	label,
	value,
	type,
	placeholder,
	onChange,
	style,
	required,
}) => {
	return (
		<div className="input">
			<span className="input__subtitle">{label}</span>
			<input
				className="input__subtitle__input outline-none"
				type={type}
				value={value}
				style={style}
				placeholder={placeholder}
				onChange={onChange}
				size={1}
				name={name}
				required={required}
			/>
		</div>
	);
};

export default Input;
