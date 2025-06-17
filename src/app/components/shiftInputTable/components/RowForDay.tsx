import { useHolidayCheck } from '@/app/hooks/useHolidayCheck'
import dayjs from 'dayjs'
import { ShiftDraft } from '../../../types/shift'
import ShiftCell from './ShiftCell'

interface RowForDayProps {
    day: dayjs.Dayjs
    shiftDrafts: ShiftDraft[]
    onDraftUpdate: (draft: ShiftDraft) => void
}

export default function RowForDay({
    day,
    shiftDrafts,
    onDraftUpdate,
}: RowForDayProps) {
    const { isHoliday, holidayReason } = useHolidayCheck(
        day.format('YYYY-MM-DD')
    )

    return (
        <tr key={day.format('YYYY-MM-DD')}>
            <td>{day.format('D (ddd)')}</td>
            <td>
                {isHoliday ? (
                    <div className="text-muted small">{holidayReason}</div>
                ) : shiftDrafts.length > 0 ? (
                    <ShiftCell
                        key={day.format('YYYY-MM-DD')}
                        shiftDrafts={shiftDrafts}
                        onDraftUpdate={onDraftUpdate}
                    />
                ) : (
                    <span className="text-muted">未入力</span>
                )}
            </td>
        </tr>
    )
}
