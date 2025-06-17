import { ShiftDraft } from '@/app/types/shift'
import React from 'react'
import { Button, Col, Form } from 'react-bootstrap'

interface ShiftCellForOneShiftProps {
    shiftDraft: ShiftDraft
    onDraftUpdate: (draft: ShiftDraft) => void
}

export default function ShiftCellForOneShift({
    shiftDraft,
    onDraftUpdate,
}: ShiftCellForOneShiftProps) {
    return (
        <React.Fragment key={shiftDraft.id}>
            <Col className="d-flex align-items-center gap-1" xs={8} md={5}>
                <Form.Control
                    type="time"
                    size="sm"
                    value={shiftDraft.startTime}
                    onChange={(e) => {
                        onDraftUpdate({
                            ...shiftDraft,
                            startTime: e.target.value,
                        })
                    }}
                />
                <span className="small">～</span>
                <Form.Control
                    type="time"
                    size="sm"
                    value={shiftDraft.endTime}
                    onChange={(e) => {
                        onDraftUpdate({
                            ...shiftDraft,
                            endTime: e.target.value,
                        })
                    }}
                />
            </Col>
            <Col xs={4} md={1} className="d-flex justify-content-center">
                <Button variant="outline-primary" size="sm">
                    分割
                </Button>
            </Col>
            <Col xs={12} md={6} className="d-flex justify-content-center">
                <Button variant="outline-danger" size="sm">
                    休みにする
                </Button>
            </Col>
        </React.Fragment>
    )
}
