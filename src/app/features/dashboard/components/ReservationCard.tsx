import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { pushPage } from '@/app/store/navigationSlice'
import { setSelectedReservation } from '@/app/store/reservationSlice'
import { Page } from '@/app/types/Page'
import { TreatmentRecord } from '@/app/types/treatmentRecord'
import dayjs from 'dayjs'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { useTreatmentNavigation } from '../../treatmentRecord/hooks/useTreatmentNavigation'
import { DashboardReservation } from '../types/DashboardReservation'

interface ReservationCardProps {
    reservationInfo: DashboardReservation
    hideDate?: boolean
}

export default function ReservationCard({
    reservationInfo,
    hideDate,
}: ReservationCardProps) {
    const reservations = useAppSelector(
        (state) => state.reservation.reservations
    )

    const { openOrCreateTreatmentRecordForReservation } =
        useTreatmentNavigation()
    const dispatch = useAppDispatch()
    const handleDetailClick = () => {
        dispatch(
            setSelectedReservation(
                reservations.find((r) => r.id === reservationInfo.id)!
            )
        )
        dispatch(pushPage(Page.RESERVE_DETAIL))
    }

    const handleRecordClick = () => {
        openOrCreateTreatmentRecordForReservation(reservationInfo.id)
    }

    return (
        <Col key={reservationInfo.id}>
            <Card className="h-100">
                <Card.Header>
                    <Row className="align-items-center">
                        <Col>
                            <Card.Title className="mb-0">
                                {reservationInfo.client}
                            </Card.Title>
                        </Col>
                        <Col xs="auto">
                            <div className="d-flex gap-2">
                                <Button
                                    size="sm"
                                    variant="primary"
                                    onClick={handleDetailClick}
                                >
                                    詳細
                                </Button>
                                <Button
                                    size="sm"
                                    variant={
                                        reservationInfo.record
                                            ? 'success'
                                            : 'outline-success'
                                    }
                                    onClick={handleRecordClick}
                                >
                                    {reservationInfo.record
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
                            <>
                                {dayjs(reservationInfo.date).format(
                                    'MM/DD(ddd)'
                                )}
                            </>
                        )}
                        {reservationInfo.time}
                    </Card.Text>
                    <Card.Text>{reservationInfo.notes}</Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}
function setSelectedTreatmentRecord(record: TreatmentRecord): any {
    throw new Error('Function not implemented.')
}
function openReservationDetail(id: string) {
    throw new Error('Function not implemented.')
}
