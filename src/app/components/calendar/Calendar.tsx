import { useCalendar } from '@/app/hooks/useCalendar'
import { Table } from 'react-bootstrap'
import CalendarHeader from './CalendarHeader'
import CalendarNavigation from './CalendarNavigation'
import CalendarStyles from './CalendarStyles'
import CalendarTimeRow from './CalendarTimeRow'
import { CalendarCellProps, CalendarProps } from './types'

export default function Calendar<
    TCellProps extends CalendarCellProps = CalendarCellProps
>({
    cellComponent: CellComponent,
    cellProps = {} as Omit<TCellProps, keyof CalendarCellProps>,
    onWeekChange,
    startDate,
}: CalendarProps<TCellProps>) {
    const {
        startOfWeek,
        days,
        hours,
        handlePrevWeek,
        handleNextWeek,
        handleToday,
    } = useCalendar()

    if (!startDate) {
        startDate = startOfWeek.format('YYYY-MM-DD')
    }

    return (
        <div>
            <CalendarStyles />
            <CalendarNavigation
                onPrevWeek={() => handlePrevWeek(onWeekChange)}
                onNextWeek={() => handleNextWeek(onWeekChange)}
                onToday={() => handleToday(onWeekChange)}
            />
            <Table
                bordered
                responsive
                className="w-100 text-center align-middle small"
            >
                <CalendarHeader days={days(startDate)} />
                <tbody>
                    {hours.map((hour, index) => (
                        <CalendarTimeRow<TCellProps>
                            key={hour}
                            hour={hour}
                            days={days(startDate)}
                            isFirstRow={index === 0}
                            CellComponent={CellComponent}
                            cellProps={cellProps}
                        />
                    ))}
                </tbody>
            </Table>
        </div>
    )
}
