import { TimeIdentifier } from '@/app/types/timeIdentifier'
import { Row } from 'react-bootstrap'
import { ShiftDraft } from '../../../types/shift'
import ShiftCellForNoShift from './ShiftCellForNoShift'
import ShiftCellForOneShift from './ShiftCellForOneShift'
import ShiftCellForTwoShifts from './ShiftCellForTwoShifts'

interface ShiftCellProps {
    date: TimeIdentifier
    shiftDrafts: ShiftDraft[]
    onDraftUpdate: (draft: ShiftDraft) => void
    onDraftCreate: (date: TimeIdentifier) => void
    onDraftDelete: (date: TimeIdentifier) => void
    onDraftSplit: (date: TimeIdentifier) => void
    onDraftMerge: (date: TimeIdentifier) => void
}

export default function ShiftCell({
    date,
    shiftDrafts,
    onDraftUpdate,
    onDraftCreate,
    onDraftDelete,
    onDraftSplit,
    onDraftMerge,
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
                    onDraftSplit={() => onDraftSplit(date)}
                    onDraftDelete={() => onDraftDelete(date)}
                />
            ) : shiftDrafts.length == 2 ? (
                <ShiftCellForTwoShifts
                    key={shiftDrafts[0].id}
                    shiftDrafts={shiftDrafts}
                    onDraftUpdate={onDraftUpdate}
                    onDraftDelete={() => onDraftDelete(date)}
                    onDraftMerge={() => onDraftMerge(date)}
                />
            ) : null}
        </Row>
    )
}
