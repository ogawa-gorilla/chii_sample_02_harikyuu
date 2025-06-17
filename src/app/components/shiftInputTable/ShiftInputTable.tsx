import dayjs from 'dayjs'
import { Table } from 'react-bootstrap'
import { ShiftDraft } from '../../types/shift'
import RowForDay from './components/RowForDay'

interface ShiftInputTableProps {
    days: dayjs.Dayjs[]
    shiftDrafts: ShiftDraft[]
    onDraftUpdate: (draft: ShiftDraft) => void
    onDraftCreate: (date: string) => void
}

export default function ShiftInputTable({
    days,
    shiftDrafts,
    onDraftUpdate,
    onDraftCreate,
}: ShiftInputTableProps) {
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
                    {days.map((day) => {
                        const drafts = shiftDrafts.filter(
                            (draft) => draft.date === day.format('YYYY-MM-DD')
                        )
                        return (
                            <RowForDay
                                key={day.format('YYYY-MM-DD')}
                                day={day}
                                shiftDrafts={drafts}
                                onDraftUpdate={onDraftUpdate}
                                onDraftCreate={onDraftCreate}
                            />
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}
