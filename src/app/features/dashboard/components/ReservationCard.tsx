import dayjs from 'dayjs'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { DashboardReservation } from '../types/DashboardReservation'

interface ReservationCardProps {
    reservation: DashboardReservation
    hideDate?: boolean
}

export default function ReservationCard({
    reservation,
    hideDate,
}: ReservationCardProps) {
    return (
        <Col key={reservation.id}>
            <Card className="h-100">
                <Card.Header>
                    <Row className="align-items-center">
                        <Col>
                            <Card.Title className="mb-0">
                                {reservation.client}
                            </Card.Title>
                        </Col>
                        <Col xs="auto">
                            <div className="d-flex gap-2">
                                <Button size="sm" variant="outline-primary">
                                    詳細
                                </Button>
                                <Button size="sm" variant="outline-secondary">
                                    施術記録
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        {!hideDate && (
                            <>{dayjs(reservation.date).format('MM/DD(ddd)')}</>
                        )}
                        {reservation.time}
                    </Card.Text>
                    <Card.Text>{reservation.notes}</Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}
