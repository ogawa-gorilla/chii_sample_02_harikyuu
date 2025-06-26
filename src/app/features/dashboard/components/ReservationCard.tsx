import dayjs from 'dayjs'
import { Card, Col } from 'react-bootstrap'
import { DashboardReservation } from '../types/DashboardReservation'

interface ReservationCardProps {
    reservation: DashboardReservation
}

export default function ReservationCard({ reservation }: ReservationCardProps) {
    return (
        <Col key={reservation.id}>
            <Card className="h-100">
                <Card.Body>
                    <Card.Title>{reservation.client}</Card.Title>
                    <Card.Text>
                        予約日: {dayjs(reservation.date).format('MM/DD(ddd)')}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}
