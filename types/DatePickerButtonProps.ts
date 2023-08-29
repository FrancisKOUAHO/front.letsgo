import {MouseEventHandler} from "react";

type DatePickerButtonProps = {
	label: string;
  date: Date;
  isFirst: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export default DatePickerButtonProps;
