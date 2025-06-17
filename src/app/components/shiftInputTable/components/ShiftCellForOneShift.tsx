import { ShiftDraft } from '@/app/types/shift'
import React from 'react'
import { Button, Col } from 'react-bootstrap'
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
    return (
        <React.Fragment key={shiftDraft.id}>
            <Col className="d-flex align-items-center gap-1" xs={8} md={5}>
                <ShiftInput
                    shiftDraft={shiftDraft}
                    onDraftUpdate={onDraftUpdate}
                />
            </Col>
            <Col xs={4} md={1} className="d-flex justify-content-center">
                <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={onDraftSplit}
                >
                    分割
                </Button>
            </Col>
            <Col xs={12} md={6} className="d-flex justify-content-center">
                <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={onDraftDelete}
                >
                    休みにする
                </Button>
            </Col>
        </React.Fragment>
    )
}
