import dayjs from 'dayjs'
import { Card, Col } from 'react-bootstrap'
import { DashboardReservation } from '../types/DashboardReservation'

interface ReservationCardProps {
    reservation: DashboardReservation
    expanded: boolean
}

export default function ReservationCard({ reservation }: ReservationCardProps) {
    return (
        <Col key={reservation.id}>
            <Card className="h-100">
                <Card.Body>
                    <Card.Title>{reservation.client}</Card.Title>
                    <Card.Text>
                        {dayjs(reservation.date).format('MM/DD(ddd)')}
                        {reservation.time}
                    </Card.Text>
                    <Card.Text>{reservation.notes}</Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}
