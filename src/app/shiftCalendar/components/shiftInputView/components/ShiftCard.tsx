import { useAppDispatch } from '@/app/hooks'
import {
    deleteShiftDraft,
    setDraftErrors,
    setDraftWarnings,
    updateShiftDraft,
} from '@/app/store/shiftSlice'
import { ShiftDraft } from '@/app/types/shift'
import { validateShiftDraft } from '@/utils/validation/shiftValidation'
import { useEffect } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'

interface ShiftCardProps {
    shiftNumber: number
    draft: ShiftDraft
    groupErrors: string[]
    groupWarnings: string[]
}

export default function ShiftCard({
    shiftNumber,
    draft,
    groupErrors,
    groupWarnings,
}: ShiftCardProps) {
    const dispatch = useAppDispatch()

    const handleStartTimeChange = (startTime: string) => {
        const newValue = { ...draft, startTime }
        dispatch(updateShiftDraft(newValue))
    }

    const handleEndTimeChange = (endTime: string) => {
        const newValue = { ...draft, endTime }
        dispatch(updateShiftDraft(newValue))
    }

    const handleDelete = () => {
        dispatch(deleteShiftDraft(draft.id))
    }

    useEffect(() => {
        const { errors, warnings } = validateShiftDraft(draft)
        dispatch(setDraftErrors({ id: draft.id, errors: errors }))
        dispatch(setDraftWarnings({ id: draft.id, warnings: warnings }))
    }, [temporalValue, groupErrors, groupWarnings])

    return (
        <Card
            className="mb-2"
            style={{ fontSize: '0.75rem' }}
            key={temporalValue.id}
        >
            <Card.Header className="py-1 px-2" style={{ fontSize: '0.7rem' }}>
                シフト{shiftNumber + 1}
            </Card.Header>
            <Card.Body
                className="p-2"
                style={{
                    border:
                        errors.length > 0
                            ? '1px solid red'
                            : warnings.length > 0
                            ? '1px solid yellow'
                            : 'none',
                }}
            >
                <Row className="align-items-center">
                    <Col xs={4}>
                        <Form.Control
                            as="input"
                            type="time"
                            min="09:00"
                            max="18:00"
                            step="1800"
                            size="sm"
                            value={temporalValue.startTime}
                            style={{ fontSize: '0.7rem' }}
                            onChange={(e) =>
                                handleStartTimeChange(e.target.value)
                            }
                        />
                    </Col>
                    <Col
                        xs={1}
                        className="text-center p-0"
                        style={{ fontSize: '0.7rem' }}
                    >
                        ～
                    </Col>
                    <Col xs={4}>
                        <Form.Control
                            as="input"
                            type="time"
                            min="09:00"
                            max="18:00"
                            step="1800"
                            size="sm"
                            value={temporalValue.endTime}
                            style={{ fontSize: '0.7rem' }}
                            onChange={(e) =>
                                handleEndTimeChange(e.target.value)
                            }
                        />
                    </Col>
                    <Col xs={3} className="text-end">
                        <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={handleDelete}
                        >
                            削除
                        </Button>
                    </Col>
                </Row>
                <div className="mt-2">
                    {errors.map((error) => (
                        <Row key={error}>
                            <Col xs={12} className="text-danger">
                                ❌ {error}
                            </Col>
                        </Row>
                    ))}
                    {warnings.map((warning) => (
                        <Row key={warning}>
                            <Col xs={12} className="text-warning">
                                ⚠️ {warning}
                            </Col>
                        </Row>
                    ))}
                </div>
            </Card.Body>
        </Card>
    )
}
