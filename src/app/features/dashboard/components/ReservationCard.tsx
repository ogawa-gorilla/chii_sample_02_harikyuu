import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { pushPage } from '@/app/store/navigationSlice'
import { setSelectedReservation } from '@/app/store/reservationSlice'
import { Page } from '@/app/types/Page'
import { TreatmentRecord } from '@/app/types/treatmentRecord'
import dayjs from 'dayjs'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { useTreatmentForm } from '../../treatmentRecord/hooks/useTreatmentForm'
import { DashboardReservation } from '../types/DashboardReservation'

interface ReservationCardProps {
    reservation: DashboardReservation
    hideDate?: boolean
}

export default function ReservationCard({
    reservation,
    hideDate,
}: ReservationCardProps) {
    const dispatch = useAppDispatch()
    const { openOrCreateForReservation } = useTreatmentForm()

    const targetReservation = useAppSelector((state) =>
        state.reservation.reservations.find((r) => r.id === reservation.id)
    )!

    const handleDetailClick = () => {
        dispatch(setSelectedReservation(targetReservation))
        dispatch(pushPage(Page.RESERVE_DETAIL))
    }

    const handleRecordClick = () => {
        openOrCreateForReservation(reservation.id)
    }

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
                                <Button
                                    size="sm"
                                    variant="outline-primary"
                                    onClick={handleDetailClick}
                                >
                                    詳細
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline-secondary"
                                    onClick={handleRecordClick}
                                >
                                    {reservation.record
                                        ? '施術記録を編集'
                                        : '施術記録を作成'}
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
function setSelectedTreatmentRecord(record: TreatmentRecord): any {
    throw new Error('Function not implemented.')
}
