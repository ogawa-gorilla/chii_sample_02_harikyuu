import { ShiftDraft } from '@/app/types/shift'
import {
    shiftIndices,
    validateShiftDrafts,
} from '@/utils/validation/shiftValidation'
import React from 'react'
import { Button, Col } from 'react-bootstrap'
import ErrorSection from './ErrorSection'
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
    const globalValidationResult = validateShiftDrafts(
        shiftDrafts[0],
        shiftDrafts[1]
    )
    return (
        <React.Fragment key={shiftDrafts[0].id}>
            {shiftDrafts.map((shiftDraft, index) => {
                const { errors, warnings } = shiftIndices(
                    globalValidationResult,
                    index * -2
                )
                return (
                    <React.Fragment key={shiftDraft.id}>
                        <Col
                            key={shiftDraft.id}
                            className="d-flex align-items-center gap-1"
                            xs={9}
                            md={5}
                        >
                            <ShiftInput
                                shiftDraft={shiftDraft}
                                validationResult={{
                                    errors: errors,
                                    warnings: warnings,
                                }}
                                onDraftUpdate={onDraftUpdate}
                            />
                        </Col>

                        {index == 0 ? (
                            <Col
                                className="d-flex justify-content-center align-items-center"
                                xs={12}
                                md={1}
                            >
                                <span>と</span>
                            </Col>
                        ) : (
                            <Col
                                xs={6}
                                md={1}
                                className="d-flex justify-content-center align-items-center"
                            >
                                <Button
                                    variant="outline-warning"
                                    size="sm"
                                    onClick={onDraftMerge}
                                >
                                    結合
                                </Button>
                            </Col>
                        )}
                    </React.Fragment>
                )
            })}
            <Col xs={6} md={12} className="d-flex justify-content-center">
                <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={onDraftDelete}
                >
                    休みにする
                </Button>
            </Col>
            <ErrorSection validationResult={globalValidationResult} />
        </React.Fragment>
    )
}
