import { Shift } from '@/app/types/shift'
import { filterShiftsAtHour } from '@/app/utils/shiftUtils'
import dayjs from 'dayjs'

interface ShiftCalendarCellProps {
    day: dayjs.Dayjs
    hour: number
    allShifts: Shift[]
    onCellClick: (date: string, shifts: Shift[]) => void
}

const getShifts = (allShifts: Shift[], day: dayjs.Dayjs, hour: number) => {
    return filterShiftsAtHour(allShifts, day.format('YYYY-MM-DD'), hour)
}

const getClassName = (hasShifts: boolean) => {
    return hasShifts ? 'work' : ''
}

export default function ShiftCalendarCell({
    day,
    hour,
    allShifts,
    onCellClick,
}: ShiftCalendarCellProps) {
    const todaysShifts = getShifts(allShifts, day, hour)
    const hasTodaysShifts = todaysShifts.length > 0

    const handleClick = () => {
        if (hasTodaysShifts && onCellClick) {
            onCellClick(day.format('YYYY-MM-DD'), todaysShifts)
        }
    }

    return (
        <td
            key={`${day.format()}-${hour}`}
            className={getClassName(hasTodaysShifts)}
            onClick={handleClick}
        >
            {hasTodaysShifts ? (
                <div className="align-items-center">出勤</div>
            ) : null}
            <style jsx>{`
                td.work {
                    color: white !important;
                    background-color: #007bff !important;
                    cursor: pointer;
                }
            `}</style>
        </td>
    )
}
