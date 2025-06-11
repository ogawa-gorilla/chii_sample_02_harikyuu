import { Button, Card, Col, Form, Row } from 'react-bootstrap'

interface ShiftCardProps {
    shiftNumber: number
    startTime: string
    endTime: string
    warnings: string[]
    errors: string[]
    onStartTimeChange: (startTime: string) => void
    onEndTimeChange: (endTime: string) => void
}
export default function ShiftCard({
    shiftNumber,
    startTime,
    endTime,
    onStartTimeChange,
    onEndTimeChange,
    warnings,
    errors,
}: ShiftCardProps) {
    return (
        <Card className="mb-2" style={{ fontSize: '0.75rem' }}>
            <Card.Header className="py-1 px-2" style={{ fontSize: '0.7rem' }}>
                シフト{shiftNumber}
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
                <Row className="mb-2 align-items-center">
                    <Col xs={6}>
                        <div className="d-flex gap-1">
                            <Button
                                variant="outline-secondary"
                                size="sm"
                                style={{
                                    fontSize: '0.55rem',
                                    padding: '1px 4px',
                                }}
                            >
                                全日
                            </Button>
                            <Button
                                variant="outline-secondary"
                                size="sm"
                                style={{
                                    fontSize: '0.55rem',
                                    padding: '1px 4px',
                                }}
                            >
                                午前
                            </Button>
                            <Button
                                variant="outline-secondary"
                                size="sm"
                                style={{
                                    fontSize: '0.55rem',
                                    padding: '1px 4px',
                                }}
                            >
                                午後
                            </Button>
                        </div>
                    </Col>
                    <Col xs={6} className="text-end">
                        <Button variant="outline-danger" size="sm">
                            削除
                        </Button>
                    </Col>
                </Row>
                <Row className="align-items-center">
                    <Col xs={5}>
                        <Form.Control
                            type="time"
                            size="sm"
                            value={startTime}
                            style={{ fontSize: '0.7rem' }}
                            onChange={(e) => onStartTimeChange(e.target.value)}
                        />
                    </Col>
                    <Col
                        xs={2}
                        className="text-center p-0"
                        style={{ fontSize: '0.7rem' }}
                    >
                        ～
                    </Col>
                    <Col xs={5}>
                        <Form.Control
                            type="time"
                            size="sm"
                            value={endTime}
                            style={{ fontSize: '0.7rem' }}
                            onChange={(e) => onEndTimeChange(e.target.value)}
                        />
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
