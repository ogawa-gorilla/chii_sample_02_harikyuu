import { ShiftDraft } from '@/app/types/shift'
import React from 'react'
import { Form } from 'react-bootstrap'

interface ShiftInputProps {
    shiftDraft: ShiftDraft
    onDraftUpdate: (draft: ShiftDraft) => void
}

export default function ShiftInput({
    shiftDraft,
    onDraftUpdate,
}: ShiftInputProps) {
    return (
        <React.Fragment>
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
        </React.Fragment>
    )
}
