import dayjs from 'dayjs'
import { Table } from 'react-bootstrap'
import { ShiftDraft } from '../../types/shift'

interface ShiftInputTableProps {
    days: dayjs.Dayjs[]
    shiftDrafts: ShiftDraft[]
}

export default function ShiftInputTable({
    days,
    shiftDrafts,
}: ShiftInputTableProps) {
    console.log(shiftDrafts)
    return (
        <div className="text-center">
            <span className="text-muted">※PCでの操作をおすすめします。</span>
            <Table
                bordered
                responsive
                className="w-100 text-center align-middle small"
            >
                <thead>
                    <tr>
                        <th>日付</th>
                        <th>シフト</th>
                    </tr>
                </thead>
                <tbody>
                    {days.map((day) => (
                        <tr key={day.format('YYYY-MM-DD')}>
                            <td>{day.format('D (ddd)')}</td>
                            <td>
                                {shiftDrafts.some(
                                    (draft) =>
                                        draft.date === day.format('YYYY-MM-DD')
                                )
                                    ? shiftDrafts.find(
                                          (draft) =>
                                              draft.date ===
                                              day.format('YYYY-MM-DD')
                                      )?.startTime
                                    : null}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}
