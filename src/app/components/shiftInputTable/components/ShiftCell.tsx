import { Form } from 'react-bootstrap'
import { ShiftDraft } from '../../../types/shift'

interface ShiftCellProps {
    shiftDrafts: ShiftDraft[]
    onDraftUpdate: (draft: ShiftDraft) => void
}

export default function ShiftCell({
    shiftDrafts,
    onDraftUpdate,
}: ShiftCellProps) {
    return (
        <div>
            {shiftDrafts.map((draft) => (
                <div key={draft.id} className="d-flex align-items-center gap-2">
                    <Form.Control
                        type="time"
                        value={draft.startTime}
                        onChange={(e) => {
                            onDraftUpdate({
                                ...draft,
                                startTime: e.target.value,
                            })
                        }}
                    />
                    <span>～</span>
                    <Form.Control
                        type="time"
                        value={draft.endTime}
                        onChange={(e) => {
                            onDraftUpdate({
                                ...draft,
                                endTime: e.target.value,
                            })
                        }}
                    />
                </div>
            ))}
        </div>
    )
}
