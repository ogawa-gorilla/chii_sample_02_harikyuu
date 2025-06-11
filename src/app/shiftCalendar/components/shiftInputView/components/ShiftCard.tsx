import { Button, Card, Col, Form, Row } from 'react-bootstrap'

interface ShiftCardProps {
    shiftNumber: number
    startTime: string
    endTime: string
    shiftId: string
    warnings: string[]
    errors: string[]
    onStartTimeChange: (shiftNumber: number, startTime: string) => void
    onEndTimeChange: (shiftNumber: number, endTime: string) => void
    onDelete: (shiftNumber: number) => void
}
export default function ShiftCard({
    shiftNumber,
    startTime,
    endTime,
    shiftId,
    onStartTimeChange,
    onEndTimeChange,
    onDelete,
    warnings,
    errors,
}: ShiftCardProps) {
    return (
        <Card className="mb-2" style={{ fontSize: '0.75rem' }} key={shiftId}>
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
                            value={startTime}
                            style={{ fontSize: '0.7rem' }}
                            onChange={(e) =>
                                onStartTimeChange(shiftNumber, e.target.value)
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
                            value={endTime}
                            style={{ fontSize: '0.7rem' }}
                            onChange={(e) =>
                                onEndTimeChange(shiftNumber, e.target.value)
                            }
                        />
                    </Col>
                    <Col xs={3} className="text-end">
                        <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => onDelete(shiftNumber)}
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
