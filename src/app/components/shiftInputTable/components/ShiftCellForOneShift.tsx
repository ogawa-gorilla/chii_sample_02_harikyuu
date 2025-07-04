import { ShiftDraft } from '@/app/types/shift'
import { validateShiftDraft } from '@/utils/validation/shiftValidation'
import React from 'react'
import { Button, Col } from 'react-bootstrap'
import ErrorSection from './ErrorSection'
import ShiftInput from './ShiftInput'

interface ShiftCellForOneShiftProps {
    shiftDraft: ShiftDraft
    onDraftUpdate: (draft: ShiftDraft) => void
    onDraftDelete: () => void
    onDraftSplit: () => void
}

export default function ShiftCellForOneShift({
    shiftDraft,
    onDraftUpdate,
    onDraftDelete,
    onDraftSplit,
}: ShiftCellForOneShiftProps) {
    const {
        result: { errors, warnings },
    } = validateShiftDraft(shiftDraft)
    return (
        <React.Fragment key={shiftDraft.id}>
            <Col className="d-flex align-items-center gap-1" xs={9} md={5}>
                <ShiftInput
                    shiftDraft={shiftDraft}
                    validationResult={{ errors, warnings }}
                    onDraftUpdate={onDraftUpdate}
                />
            </Col>
            <Col xs={6} md={1} className="d-flex justify-content-center">
                <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={onDraftSplit}
                >
                    分割
                </Button>
            </Col>
            <Col xs={6} md={6} className="d-flex justify-content-center">
                <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={onDraftDelete}
                    className="w-100"
                >
                    休みにする
                </Button>
            </Col>
            <ErrorSection validationResult={{ errors, warnings }} />
        </React.Fragment>
    )
}
