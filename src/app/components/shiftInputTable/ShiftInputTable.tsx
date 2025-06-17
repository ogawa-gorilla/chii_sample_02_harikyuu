import { Table } from 'react-bootstrap'
import { useShiftDraftManager } from '../../hooks/useShiftDraftManager'
import { ShiftDraft } from '../../types/shift'
import RowForDay from './components/RowForDay'
import ShiftInputActionBar from './components/ShiftInputActionBar'

interface ShiftInputTableProps {
    onCommit: (drafts: ShiftDraft[]) => void
    onAbort: () => void
}

export default function ShiftInputTable({
    onCommit,
    onAbort,
}: ShiftInputTableProps) {
    const {
        shiftDrafts,
        targetDates,
        handleDraftUpdate,
        handleDraftCreate,
        handleDraftDelete,
        handleDraftSplit,
        handleDraftMerge,
        handleUndo,
    } = useShiftDraftManager()

    const handleSave = () => {
        // TODO: 値のバリデーション
        onCommit(shiftDrafts)
    }

    const handleCancel = () => {
        // TODO: モーダルで確認
        onAbort()
    }

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
                    {targetDates.map((date) => {
                        const drafts = shiftDrafts.filter(
                            (draft) => draft.date.value === date.value
                        )
                        return (
                            <RowForDay
                                key={date.value}
                                date={date}
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
            <ShiftInputActionBar
                onSave={handleSave}
                onUndo={handleUndo}
                onCancel={handleCancel}
            />
        </div>
    )
}
