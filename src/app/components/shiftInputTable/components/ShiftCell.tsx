import { Row } from 'react-bootstrap'
import { ShiftDraft } from '../../../types/shift'
import ShiftCellForNoShift from './ShiftCellForNoShift'
import ShiftCellForOneShift from './ShiftCellForOneShift'
import ShiftCellForTwoShifts from './ShiftCellForTwoShifts'

interface ShiftCellProps {
    date: string
    shiftDrafts: ShiftDraft[]
    onDraftUpdate: (draft: ShiftDraft) => void
    onDraftCreate: (date: string) => void
    onDraftDelete: (date: string) => void
}

export default function ShiftCell({
    date,
    shiftDrafts,
    onDraftUpdate,
    onDraftCreate,
    onDraftDelete,
}: ShiftCellProps) {
    return (
        <Row className="no-gutters g-1">
            {shiftDrafts.length == 0 ? (
                <ShiftCellForNoShift
                    date={date}
                    onDraftCreate={() => {
                        onDraftCreate(date)
                    }}
                />
            ) : shiftDrafts.length == 1 ? (
                <ShiftCellForOneShift
                    key={shiftDrafts[0].id}
                    shiftDraft={shiftDrafts[0]}
                    onDraftUpdate={onDraftUpdate}
                    onDraftDelete={() => onDraftDelete(date)}
                />
            ) : shiftDrafts.length == 2 ? (
                <ShiftCellForTwoShifts
                    key={shiftDrafts[0].id}
                    shiftDrafts={shiftDrafts}
                    onDraftUpdate={onDraftUpdate}
                    onDraftDelete={() => onDraftDelete(date)}
                />
            ) : null}
        </Row>
    )
}
