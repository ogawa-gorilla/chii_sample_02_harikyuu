import { Card, Col, Row } from 'react-bootstrap'
import { DashboardReservation } from '../types/DashboardReservation'
import ReservationCard from './ReservationCard'

interface ReservationCardListProps {
    data: DashboardReservation[]
    hideDate?: boolean
}

export default function ReservationCardList({
    data,
    hideDate,
}: ReservationCardListProps) {
    return (
        <Row xs={1} sm={2} md={3} lg={4} className="g-3">
            {data.length === 0 ? (
                <Col>
                    <Card body className="text-muted">
                        該当する予約はありません。
                    </Card>
                </Col>
            ) : (
                data.map((res: DashboardReservation) => (
                    <ReservationCard
                        reservation={res}
                        key={res.id}
                        hideDate={hideDate}
                    />
                ))
            )}
        </Row>
    )
}
