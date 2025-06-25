import { Card, Col, Row } from 'react-bootstrap'
import { ReservationForDashboard } from '../types/ReservationForDashboard'
import ReservationCard from './ReservationCard'

interface ReservationCardListProps {
    data: ReservationForDashboard[]
}

export default function ReservationCardList({
    data,
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
                data.map((res: ReservationForDashboard) => (
                    <ReservationCard reservation={res} key={res.id} />
                ))
            )}
        </Row>
    )
}
