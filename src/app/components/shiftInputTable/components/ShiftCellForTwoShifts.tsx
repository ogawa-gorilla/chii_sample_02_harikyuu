import { ShiftDraft } from '@/app/types/shift'
import {
    validateShiftDraft,
    validateShiftDrafts,
} from '@/utils/validation/shiftValidation'
import React from 'react'
import { Alert, Button, Col } from 'react-bootstrap'
import ShiftInput from './ShiftInput'

interface ShiftCellForOneShiftProps {
    shiftDrafts: ShiftDraft[]
    onDraftUpdate: (draft: ShiftDraft) => void
    onDraftDelete: () => void
    onDraftMerge: () => void
}

export default function ShiftCellForOneShift({
    shiftDrafts,
    onDraftUpdate,
    onDraftDelete,
    onDraftMerge,
}: ShiftCellForOneShiftProps) {
    let { errors: allErrors, warnings: allWarnings } = validateShiftDrafts(
        shiftDrafts[0],
        shiftDrafts[1]
    )
    shiftDrafts.forEach((shiftDraft) => {
        const { errors, warnings } = validateShiftDraft(shiftDraft)
        allErrors = [...allErrors, ...errors]
        allWarnings = [...allWarnings, ...warnings]
    })

    return (
        <React.Fragment key={shiftDrafts[0].id}>
            {shiftDrafts.map((shiftDraft, index) => {
                const { errors, warnings } = validateShiftDraft(shiftDraft)
                return (
                    <React.Fragment key={shiftDraft.id}>
                        <Col
                            key={shiftDraft.id}
                            className="d-flex align-items-center gap-1"
                            xs={8}
                            md={5}
                        >
                            <ShiftInput
                                shiftDraft={shiftDraft}
                                hasError={
                                    errors.length > 0 || allErrors.length > 0
                                }
                                hasWarning={
                                    warnings.length > 0 ||
                                    allWarnings.length > 0
                                }
                                onDraftUpdate={onDraftUpdate}
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
                                <Button
                                    variant="outline-warning"
                                    size="sm"
                                    onClick={onDraftMerge}
                                >
                                    分割解除
                                </Button>
                            )}
                        </Col>
                    </React.Fragment>
                )
            })}
            <Col xs={12} md={12} className="d-flex justify-content-center">
                <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={onDraftDelete}
                >
                    休みにする
                </Button>
            </Col>
            {allErrors.length > 0 && (
                <Col xs={12} md={12} className="d-flex justify-content-center">
                    <Alert variant="danger">
                        {allErrors.map((error) => error)}
                    </Alert>
                </Col>
            )}
        </React.Fragment>
    )
}
