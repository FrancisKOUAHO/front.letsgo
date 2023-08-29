import { FunctionComponent } from 'react';
import clsx from 'clsx';
import DatePickerButtonProps from '../../types/DatePickerButtonProps';
import { getDateShort, MONTHS } from '../../utils/dates'

const DatePickerButton: FunctionComponent<DatePickerButtonProps> = ({
  label,
  date,
  isFirst,
  isSelected,
  isDisabled,
  onClick,
}) => {
  const abbrLabel = (label: string, range: number) => label.slice(0, range) + '.'

  const isToday = getDateShort(date) === getDateShort(new Date())

  const shouldDisplayMonth = (date: Date) => {
    const isFirstOfMonth = date.getDate() === 1
    const isFirstOfSelection = isFirst

    return isFirstOfMonth || isFirstOfSelection
  }

	return (
    <div className={clsx('c-datepicker', isToday && '--is-today' )}>
      {shouldDisplayMonth(date) && <span className='c-datepicker__month-label'>
        {abbrLabel(MONTHS[date.getMonth()], 3)} {date.getFullYear()}
      </span>}
      <button
        className={clsx(
          'c-datepicker__button',
          isSelected && 'c-datepicker__button--is-selected',
          isDisabled && 'c-datepicker__button--is-disabled',
        )}
        onClick={(!isDisabled && !isSelected) ? onClick : undefined}
        disabled={isDisabled}
      >
        <span className='c-datepicker__button__label'>{isToday ? 'Aujourd\'hui' : abbrLabel(label, 3)}</span>
        <span className='c-datepicker__button__date'>{date.getDate()}</span>
      </button>
    </div>
	);
};

export default DatePickerButton;
