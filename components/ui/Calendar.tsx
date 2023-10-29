import {FunctionComponent} from 'react'
import CalendarProps from '../../types/CalendarProps'
import ReactCalendar from 'react-calendar'
import {getDateShort} from '../../utils/dates'

const Calendar: FunctionComponent<CalendarProps | any> = ({
                                                        initialDate = new Date(),
                                                        availableDays = [],
                                                        onHideModal,
                                                        setActiveDay
                                                    }) => {
    const isTileDisabled = ({date}: any) => {
        return !availableDays.includes(getDateShort(date))
    }

    const getLastAvailableDate = () => new Date(availableDays[availableDays.length - 1])

    return (
        <ReactCalendar
            minDetail={'month'}
            maxDetail={'month'}
            minDate={new Date()}
            maxDate={getLastAvailableDate()}
            showNeighboringMonth={false}
            defaultValue={initialDate}
            onClickDay={(value: Date) => {
                onHideModal()
                setActiveDay(value)
            }}
            tileDisabled={isTileDisabled}
        />
    )
}

export default Calendar
