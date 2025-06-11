import { Button, Card, Col, Form, Row } from 'react-bootstrap'

interface ShiftConfigCardProps {
    dayKey: string
    dayName: string
    basicShifts: {
        [key: string]: { dayKey: string; startTime: string; endTime: string }
    }
    setPresetTime: (
        dayKey: string,
        preset: 'morning' | 'afternoon' | 'allday'
    ) => void
    updateBasicShift: (
        dayKey: string,
        field: 'startTime' | 'endTime',
        value: string
    ) => void
}

export default function ShiftConfigCard({
    dayKey,
    dayName,
    basicShifts,
    setPresetTime,
    updateBasicShift,
}: ShiftConfigCardProps) {
    return (
        <Card key={dayKey} className="mb-3 border-0 bg-light">
            <Card.Body className="p-3">
                <div className="d-flex align-items-center justify-content-between mb-3">
                    <h6 className="mb-0 text-primary fw-semibold">
                        <i className="bi bi-calendar2-week me-2"></i>
                        {dayName}
                    </h6>
                    <div className="btn-group btn-group-sm" role="group">
                        <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => setPresetTime(dayKey, 'morning')}
                        >
                            午前
                        </Button>
                        <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => setPresetTime(dayKey, 'afternoon')}
                        >
                            午後
                        </Button>
                        <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => setPresetTime(dayKey, 'allday')}
                        >
                            全日
                        </Button>
                    </div>
                </div>

                <Row>
                    <Col xs={6}>
                        <Form.Group>
                            <Form.Label className="fw-semibold text-secondary small">
                                <i className="bi bi-clock me-1"></i>開始時間
                            </Form.Label>
                            <Form.Control
                                type="time"
                                value={basicShifts[dayKey].startTime}
                                onChange={(e) =>
                                    updateBasicShift(
                                        dayKey,
                                        'startTime',
                                        e.target.value
                                    )
                                }
                                size="sm"
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={6}>
                        <Form.Group>
                            <Form.Label className="fw-semibold text-secondary small">
                                <i className="bi bi-clock-fill me-1"></i>
                                終了時間
                            </Form.Label>
                            <Form.Control
                                type="time"
                                value={basicShifts[dayKey].endTime}
                                onChange={(e) =>
                                    updateBasicShift(
                                        dayKey,
                                        'endTime',
                                        e.target.value
                                    )
                                }
                                size="sm"
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}
