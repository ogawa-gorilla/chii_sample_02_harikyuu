import { VIRTUAL_TODAY } from '@/app/constants/virtualToday'
import dayjs from 'dayjs'
import { Card, Col, Row } from 'react-bootstrap'
import { ReservationForDashboard } from '../types/ReservationForDashboard'
import ReservationCard from './ReservationCard'

interface ThisWeeksReservationListProps {
    groupedWeekReservations: [string, ReservationForDashboard[]][]
}

export default function ThisWeeksReservationList({
    groupedWeekReservations,
}: ThisWeeksReservationListProps) {
    return (
        <section className="mb-5">
            <h5 className="mb-3">📅 今週の予約</h5>
            {groupedWeekReservations.length === 0 ? (
                <Card body className="text-muted">
                    今週の予約はありません。
                </Card>
            ) : (
                groupedWeekReservations.map(([date, dayReservations]) => (
                    <div key={date} className="mb-4">
                        <h6 className="mb-3 text-primary">
                            {dayjs(date).format('MM/DD(ddd)')}
                            {date === VIRTUAL_TODAY && (
                                <span className="badge bg-success ms-2">
                                    今日
                                </span>
                            )}
                        </h6>
                        <Row xs={1} sm={2} md={3} lg={4} className="g-3">
                            {dayReservations.map(
                                (res: ReservationForDashboard) => (
                                    <Col key={res.id}>
                                        <ReservationCard reservation={res} />
                                    </Col>
                                )
                            )}
                        </Row>
                    </div>
                ))
            )}
        </section>
    )
}
