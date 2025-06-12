import { ShiftDraft } from '@/app/types/shift'
import { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'

interface ShiftCardProps {
    shiftNumber: number
    initialShift: ShiftDraft
    onShiftChange: (shiftNumber: number, newShift: ShiftDraft) => void
    onDelete: (shiftId: string) => void
    errors: string[]
    warnings: string[]
}

export default function ShiftCard({
    shiftNumber,
    initialShift,
    onShiftChange,
    onDelete,
    errors,
    warnings,
}: ShiftCardProps) {
    // 個別のtemporalValue状態
    const [temporalValue, setTemporalValue] = useState<ShiftDraft>(initialShift)

    const handleStartTimeChange = (startTime: string) => {
        const newValue = { ...temporalValue, startTime }
        setTemporalValue(newValue)
        // 即座にShiftCellに通知
        onShiftChange(shiftNumber, newValue)
    }

    const handleEndTimeChange = (endTime: string) => {
        const newValue = { ...temporalValue, endTime }
        setTemporalValue(newValue)
        // 即座にShiftCellに通知
        onShiftChange(shiftNumber, newValue)
    }

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
                            onClick={() => onDelete(temporalValue.id)}
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
