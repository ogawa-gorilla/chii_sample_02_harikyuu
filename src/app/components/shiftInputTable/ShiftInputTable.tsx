import dayjs from 'dayjs'
import { Table } from 'react-bootstrap'
import { useShiftDraftManager } from '../../hooks/useShiftDraftManager'
import { ShiftDraft } from '../../types/shift'
import RowForDay from './components/RowForDay'

interface ShiftInputTableProps {
    days: dayjs.Dayjs[]
    onCommit: (drafts: ShiftDraft[]) => void
}

export default function ShiftInputTable({
    days,
    onCommit,
}: ShiftInputTableProps) {
    const {
        shiftDrafts,
        handleDraftUpdate,
        handleDraftCreate,
        handleDraftDelete,
        handleDraftSplit,
        handleDraftMerge,
    } = useShiftDraftManager()

    return (
        <div className="text-center">
            <style>{`
                table.shift-input-table {
                    border: solid 1px #000000;
                }
                td.holiday {
                    background-color: #666666;
                    color: #cccccc;
                    padding: 0.25rem 0.5rem;
                    border-radius: 0.25rem;
                }
                td.off {
                    background-color: #f0f0f0;
                }
                th.table-header {
                    background-color: #eeffee;
                }
                td.date-header {
                    background-color: #eeeeee;
                }
                          table th.saturday,
                table td.saturday {
                  color: #007Bcc !important;
                  background-color: #e6f0ff !important;
                }

                table th.sunday,
                table td.sunday {
                  color: #cc3B30 !important;
                  background-color: #ffe6e6 !important;
                }
            `}</style>
            <span className="text-muted">※PCでの操作をおすすめします。</span>
            <Table
                bordered
                responsive
                className="w-100 text-center align-middle small shift-input-table"
            >
                <thead>
                    <tr>
                        <th className="table-header">日</th>
                        <th className="table-header">シフト</th>
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
                                onDraftUpdate={handleDraftUpdate}
                                onDraftCreate={handleDraftCreate}
                                onDraftDelete={handleDraftDelete}
                                onDraftSplit={handleDraftSplit}
                                onDraftMerge={handleDraftMerge}
                            />
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}
