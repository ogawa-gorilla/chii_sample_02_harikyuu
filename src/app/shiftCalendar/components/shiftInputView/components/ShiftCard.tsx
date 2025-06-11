import { Button, Card, Col, Form, Row } from 'react-bootstrap'

interface ShiftCardProps {
    shiftNumber: number
    isWorking: boolean
    startTime: string
    endTime: string
}
export default function ShiftCard({
    shiftNumber,
    isWorking,
    startTime,
    endTime,
}: ShiftCardProps) {
    return (
        <Card className="mb-2" style={{ fontSize: '0.75rem' }}>
            <Card.Header className="py-1 px-2" style={{ fontSize: '0.7rem' }}>
                シフト{shiftNumber}
            </Card.Header>
            <Card.Body className="p-2">
                <Row className="mb-2 align-items-center">
                    <Col xs={6} className="text-start">
                        <Form.Check
                            type="checkbox"
                            label="出勤"
                            checked={isWorking}
                            style={{ fontSize: '0.7rem' }}
                        />
                    </Col>
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
                </Row>
                <Row className="align-items-center">
                    <Col xs={5}>
                        <Form.Control
                            type="time"
                            size="sm"
                            value={startTime}
                            disabled={!isWorking}
                            style={{ fontSize: '0.7rem' }}
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
                            disabled={!isWorking}
                            style={{ fontSize: '0.7rem' }}
                        />
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}
