import { useHolidayCheck } from '@/app/hooks/useHolidayCheck'
import { TimeIdentifier } from '@/app/types/timeIdentifier'
import dayjs from 'dayjs'
import { ShiftDraft } from '../../../types/shift'
import ShiftCell from './ShiftCell'

interface RowForDayProps {
    date: TimeIdentifier
    shiftDrafts: ShiftDraft[]
    onDraftUpdate: (draft: ShiftDraft) => void
    onDraftCreate: (date: TimeIdentifier) => void
    onDraftDelete: (date: TimeIdentifier) => void
    onDraftSplit: (date: TimeIdentifier) => void
    onDraftMerge: (date: TimeIdentifier) => void
}

export default function RowForDay({
    date,
    shiftDrafts,
    onDraftUpdate,
    onDraftCreate,
    onDraftDelete,
    onDraftSplit,
    onDraftMerge,
}: RowForDayProps) {
    const { isHoliday, holidayReason } = useHolidayCheck(date)

    const getTdClass = () => {
        if (shiftDrafts.length === 0) {
            return 'off'
        }
        return ''
    }

    const getDateHeaderClass = (date: TimeIdentifier) => {
        let dateId: number
        if (date.type === 'date') {
            dateId = dayjs(date.value).day()
        } else {
            dateId = parseInt(date.value)
        }

        const base = 'date-header'
        if (dateId === 0) {
            return `${base} sunday`
        }
        if (dateId === 6) {
            return `${base} saturday`
        }
        return base
    }

    return (
        <tr>
            <td className={getDateHeaderClass(date)}>{date.displayValue}</td>
            {isHoliday ? (
                <td className="holiday">
                    <div className="small">{holidayReason}</div>
                </td>
            ) : (
                <td className={getTdClass()}>
                    <ShiftCell
                        key={date.value}
                        date={date}
                        onDraftCreate={() => {
                            onDraftCreate(date)
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
