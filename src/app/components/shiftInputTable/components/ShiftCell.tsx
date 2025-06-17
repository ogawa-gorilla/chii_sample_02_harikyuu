import { Row } from 'react-bootstrap'
import { ShiftDraft } from '../../../types/shift'
import ShiftCellForOneShift from './ShiftCellForOneShift'

interface ShiftCellProps {
    shiftDrafts: ShiftDraft[]
    onDraftUpdate: (draft: ShiftDraft) => void
}

export default function ShiftCell({
    shiftDrafts,
    onDraftUpdate,
}: ShiftCellProps) {
    return (
        <Row className="no-gutters g-1">
            {shiftDrafts.map((draft) => (
                <ShiftCellForOneShift
                    key={draft.id}
                    shiftDraft={draft}
                    onDraftUpdate={onDraftUpdate}
                />
            ))}
        </Row>
    )
}
