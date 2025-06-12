import Calendar from '@/app/components/calendar'
import { useAppSelector } from '@/app/hooks'
import dayjs from 'dayjs'
import ShiftCalendarCell from './ShiftCalendarCell'

interface ShiftCalendarProps {
    staffId: string
    onWeekChange: (startDate: string) => void
    startDate: string
}

export default function ShiftCalendar({
    staffId,
    onWeekChange,
    startDate,
}: ShiftCalendarProps) {
    const allShifts = useAppSelector((state) => state.shift.shifts).filter(
        (shift) => shift.staffId === staffId
    )

    return (
        <div>
            <Calendar
                cellComponent={ShiftCalendarCell}
                cellProps={{
                    allShifts: allShifts,
                    onCellClick: () => {},
                }}
                onWeekChange={onWeekChange}
                startDate={
                    (startDate = dayjs(startDate)
                        .startOf('week')
                        .add(1, 'day')
                        .format('YYYY-MM-DD'))
                }
            />
        </div>
    )
}
