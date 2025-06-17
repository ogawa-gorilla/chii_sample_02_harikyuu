import { ShiftDraft } from '@/app/types/shift'
import React from 'react'
import { Form } from 'react-bootstrap'

interface ShiftInputProps {
    shiftDraft: ShiftDraft
    hasWarning: boolean
    hasError: boolean
    onDraftUpdate: (draft: ShiftDraft) => void
}

export default function ShiftInput({
    shiftDraft,
    hasWarning,
    hasError,
    onDraftUpdate,
}: ShiftInputProps) {
    const getClass = () => {
        if (hasError) {
            return 'is-invalid bg-danger-subtle'
        }
        if (hasWarning) {
            return 'is-warning bg-warning-subtle'
        }
        return ''
    }

    return (
        <React.Fragment>
            <Form.Control
                className={getClass()}
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
                className={getClass()}
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
