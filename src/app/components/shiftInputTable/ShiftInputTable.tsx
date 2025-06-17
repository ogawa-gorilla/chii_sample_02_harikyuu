import {
    validateShiftDraft,
    validateShiftDrafts,
} from '@/utils/validation/shiftValidation'
import { useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'
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

    const [showConfirmDialog, setShowConfirmDialog] = useState(false)

    const hasAnyErrors = (drafts: ShiftDraft[]) => {
        for (const date of targetDates) {
            const draftsForDay = drafts.filter(
                (d) => d.date.value === date.value
            )
            if (draftsForDay.length === 2) {
                const { errors } = validateShiftDrafts(
                    draftsForDay[0],
                    draftsForDay[1]
                )
                if (errors.length > 0) {
                    return true
                }
            } else if (draftsForDay.length === 1) {
                const { result } = validateShiftDraft(draftsForDay[0])
                if (result.errors.length > 0) {
                    return true
                }
            }
        }
        return false
    }

    const handleSave = () => {
        if (hasAnyErrors(shiftDrafts)) {
            alert('エラーをすべて修正してください。')
            return
        }
        onCommit(shiftDrafts)
    }

    const handleCancel = () => {
        setShowConfirmDialog(true)
    }

    const handleConfirmCancel = () => {
        setShowConfirmDialog(false)
        onAbort()
    }

    const handleCloseDialog = () => {
        setShowConfirmDialog(false)
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
            <Modal show={showConfirmDialog} onHide={handleCloseDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>確認</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    すべての変更が破棄されます。よろしいですか？
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDialog}>
                        キャンセル
                    </Button>
                    <Button variant="danger" onClick={handleConfirmCancel}>
                        破棄する
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
