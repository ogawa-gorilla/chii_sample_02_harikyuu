import { ShiftDraft } from '@/app/types/shift'
import {
    ShiftError,
    ShiftValidationResult,
} from '@/utils/validation/shiftValidation'
import React from 'react'
import { Form } from 'react-bootstrap'

interface ShiftInputProps {
    shiftDraft: ShiftDraft
    validationResult: ShiftValidationResult
    onDraftUpdate: (draft: ShiftDraft) => void
}

export default function ShiftInput({
    shiftDraft,
    validationResult,
    onDraftUpdate,
}: ShiftInputProps) {
    const getClass = (index: number) => {
        if (
            validationResult.errors.some((error: ShiftError) =>
                error.indices?.includes(index)
            )
        ) {
            return 'bg-danger-subtle'
        }
        if (
            validationResult.warnings.some((warning: ShiftError) =>
                warning.indices?.includes(index)
            )
        ) {
            return 'bg-warning-subtle'
        }
        return ''
    }

    return (
        <React.Fragment>
            <Form.Control
                className={getClass(0)}
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
                className={getClass(1)}
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
