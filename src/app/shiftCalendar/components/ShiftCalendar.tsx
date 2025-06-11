import Calendar from '@/app/components/calendar'
import { useAppSelector } from '@/app/hooks'
import { Shift } from '@/app/types/shift'
import ShiftCalendarCell from './ShiftCalendarCell'

interface ShiftCalendarProps {
    staffId: string
    onCellClick: (date: string, shifts: Shift[]) => void
}

export default function ShiftCalendar({
    staffId,
    onCellClick,
}: ShiftCalendarProps) {
    const allShifts = useAppSelector((state) => state.shift.shifts).filter(
        (shift) => shift.staffId === staffId
    )
    const handleCellClick = (date: string, shifts: Shift[]) => {
        onCellClick(date, shifts)
    }

    return (
        <div>
            <Calendar
                cellComponent={ShiftCalendarCell}
                cellProps={{
                    allShifts: allShifts,
                    onCellClick: handleCellClick,
                }}
            />
        </div>
    )
}
