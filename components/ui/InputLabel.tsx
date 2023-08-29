import { FunctionComponent, useState } from 'react';
import Input from './Input'

type InputLabelProps = {
	name?: string;
	label: string;
	type: string;
	value?: string;
	error?: string;
	placeholder?: string;
	pattern?: string;
	maxlength?: number;
	onChange?: (event: any) => void,
	messageError?: any;
	disabled?: any;
};
const InputLabel: FunctionComponent<InputLabelProps> = ({
  name,
  label,
  type,
  messageError,
  placeholder = '',
}) => {
	return (
		<div className="c-input-label mt-6">
      <Input
        label={label}
        type={type}
        placeholder={placeholder}
        name={name}
        required
      />
			{messageError && (
        <div className="c-input-label-error">
            <i className="ri-error-warning-fill"/>
            <span>{messageError}</span>
        </div>
      )}
		</div>
	);
};

export default InputLabel;
