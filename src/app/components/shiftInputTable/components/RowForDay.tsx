import { useHolidayCheck } from '@/app/hooks/useHolidayCheck'
import dayjs from 'dayjs'
import { ShiftDraft } from '../../../types/shift'
import ShiftCell from './ShiftCell'

interface RowForDayProps {
    day: dayjs.Dayjs
    shiftDrafts: ShiftDraft[]
    onDraftUpdate: (draft: ShiftDraft) => void
    onDraftCreate: (date: string) => void
    onDraftDelete: (date: string) => void
    onDraftSplit: (date: string) => void
    onDraftMerge: (date: string) => void
}

export default function RowForDay({
    day,
    shiftDrafts,
    onDraftUpdate,
    onDraftCreate,
    onDraftDelete,
    onDraftSplit,
    onDraftMerge,
}: RowForDayProps) {
    const { isHoliday, holidayReason } = useHolidayCheck(
        day.format('YYYY-MM-DD')
    )

    const getTdClass = () => {
        if (shiftDrafts.length === 0) {
            return 'off'
        }
        return ''
    }

    const getDateHeaderClass = (date: string) => {
        const base = 'date-header'
        if (dayjs(date).day() === 0) {
            return `${base} sunday`
        }
        if (dayjs(date).day() === 6) {
            return `${base} saturday`
        }
        return base
    }

    return (
        <tr key={day.format('YYYY-MM-DD')}>
            <td className={getDateHeaderClass(day.format('YYYY-MM-DD'))}>
                {day.format('D (ddd)')}
            </td>
            {isHoliday ? (
                <td className="holiday">
                    <div className="small">{holidayReason}</div>
                </td>
            ) : (
                <td className={getTdClass()}>
                    <ShiftCell
                        key={day.format('YYYY-MM-DD')}
                        date={day.format('YYYY-MM-DD')}
                        onDraftCreate={() => {
                            onDraftCreate(day.format('YYYY-MM-DD'))
                        }}
                        shiftDrafts={shiftDrafts}
                        onDraftUpdate={onDraftUpdate}
                        onDraftDelete={onDraftDelete}
                        onDraftSplit={onDraftSplit}
                        onDraftMerge={onDraftMerge}
                    />
                </td>
            )}
        </tr>
    )
}
