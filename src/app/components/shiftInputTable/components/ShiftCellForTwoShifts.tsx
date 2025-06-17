import { ShiftDraft } from '@/app/types/shift'
import React from 'react'
import { Button, Col, Form } from 'react-bootstrap'

interface ShiftCellForOneShiftProps {
    shiftDrafts: ShiftDraft[]
    onDraftUpdate: (draft: ShiftDraft) => void
}

export default function ShiftCellForOneShift({
    shiftDrafts,
    onDraftUpdate,
}: ShiftCellForOneShiftProps) {
    return (
        <React.Fragment key={shiftDrafts[0].id}>
            {shiftDrafts.map((shiftDraft, index) => (
                <React.Fragment key={shiftDraft.id}>
                    <Col
                        key={shiftDraft.id}
                        className="d-flex align-items-center gap-1"
                        xs={8}
                        md={5}
                    >
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
                    <Col
                        xs={4}
                        md={1}
                        className="d-flex justify-content-center align-items-center"
                    >
                        {index == 0 ? (
                            <span>と</span>
                        ) : (
                            <Button variant="outline-warning" size="sm">
                                分割解除
                            </Button>
                        )}
                    </Col>
                </React.Fragment>
            ))}
            <Col xs={12} md={12} className="d-flex justify-content-center">
                <Button variant="outline-danger" size="sm">
                    休みにする
                </Button>
            </Col>
        </React.Fragment>
    )
}
