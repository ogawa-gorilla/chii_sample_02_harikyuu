import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap'

export default function ShiftInputView() {
    // データ範囲: 2025/6/2～2025/6/8
    const shiftData = [
        { date: '2025-06-02', dayOfWeek: '月', type: 'holiday' },
        { date: '2025-06-03', dayOfWeek: '火', type: 'holiday' },
        { date: '2025-06-04', dayOfWeek: '水', type: 'normal' },
        { date: '2025-06-05', dayOfWeek: '木', type: 'normal' },
        { date: '2025-06-06', dayOfWeek: '金', type: 'normal' },
        { date: '2025-06-07', dayOfWeek: '土', type: 'temporary_closure' },
        { date: '2025-06-08', dayOfWeek: '日', type: 'normal' },
    ]

    const renderShiftCard = (
        shiftNumber: number,
        isWorking: boolean,
        startTime: string,
        endTime: string
    ) => (
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

    const renderShiftCell = (item: (typeof shiftData)[0]) => {
        if (item.type === 'holiday') {
            return (
                <div
                    className="d-flex align-items-center justify-content-center p-2"
                    style={{ minHeight: '120px', backgroundColor: '#f8f9fa' }}
                >
                    <div className="text-center">
                        <div>定休日</div>
                        <div className="mt-1">🔒</div>
                    </div>
                </div>
            )
        }

        if (item.type === 'temporary_closure') {
            return (
                <div
                    className="d-flex align-items-center justify-content-center p-2"
                    style={{ minHeight: '120px', backgroundColor: '#f8f9fa' }}
                >
                    <div className="text-center">
                        <div>臨時休業</div>
                        <div className="mt-1">🔒</div>
                    </div>
                </div>
            )
        }

        // 通常の日
        return (
            <div className="p-1">
                {renderShiftCard(1, true, '09:00', '18:00')}
                {renderShiftCard(2, false, '', '')}
            </div>
        )
    }

    return (
        <div>
            <Table
                bordered
                responsive
                className="w-100 text-center align-middle small"
            >
                <thead>
                    <tr>
                        <th style={{ width: '10%', fontSize: '0.7rem' }}>
                            年月
                        </th>
                        <th style={{ width: '10%', fontSize: '0.7rem' }}>日</th>
                        <th style={{ width: '80%', fontSize: '0.7rem' }}>
                            シフト
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {shiftData.map((item, index) => (
                        <tr key={item.date}>
                            <td
                                style={{
                                    fontSize: '0.7rem',
                                    lineHeight: '1.2',
                                }}
                            >
                                {index === 0 ? (
                                    <>
                                        25
                                        <br />
                                        6月
                                    </>
                                ) : (
                                    ''
                                )}
                            </td>
                            <td
                                style={{
                                    fontSize: '0.7rem',
                                    lineHeight: '1.2',
                                }}
                            >
                                {new Date(item.date).getDate()}
                                <br />({item.dayOfWeek})
                            </td>
                            <td className="p-0">{renderShiftCell(item)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}
