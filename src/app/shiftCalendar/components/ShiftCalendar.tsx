import Calendar from '@/app/components/calendar'
import { useAppSelector } from '@/app/hooks'
import { Shift } from '@/app/types/shift'
import ShiftCalendarCell from './ShiftCalendarCell'

interface ShiftCalendarProps {
    staffId: string
}

export default function ShiftCalendar({ staffId }: ShiftCalendarProps) {
    const allShifts = useAppSelector((state) => state.shift.shifts).filter(
        (shift) => shift.staffId === staffId
    )
    const handleCellClick = (date: string, shifts: Shift[]) => {
        console.log(date, shifts)
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
