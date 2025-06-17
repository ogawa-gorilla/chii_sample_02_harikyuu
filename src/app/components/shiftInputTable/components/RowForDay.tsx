import dayjs from 'dayjs'
import { ShiftDraft } from '../../../types/shift'

interface RowForDayProps {
    day: dayjs.Dayjs
    shiftDrafts: ShiftDraft[]
}

export default function RowForDay({ day, shiftDrafts }: RowForDayProps) {
    return (
        <tr key={day.format('YYYY-MM-DD')}>
            <td>{day.format('D (ddd)')}</td>
            <td>
                {shiftDrafts.some(
                    (draft) => draft.date === day.format('YYYY-MM-DD')
                )
                    ? shiftDrafts.find(
                          (draft) => draft.date === day.format('YYYY-MM-DD')
                      )?.startTime
                    : null}
            </td>
        </tr>
    )
}
