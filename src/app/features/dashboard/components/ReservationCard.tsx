import { TreatmentRecord } from '@/app/types/treatmentRecord'
import dayjs from 'dayjs'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { useReservationNavigation } from '../../reservation/hooks/useReservationNavigation'
import { useTreatmentNavigation } from '../../treatmentRecord/hooks/useTreatmentNavigation'
import { DashboardReservation } from '../types/DashboardReservation'

interface ReservationCardProps {
    reservation: DashboardReservation
    hideDate?: boolean
}

export default function ReservationCard({
    reservation,
    hideDate,
}: ReservationCardProps) {
    const { openOrCreateTreatmentRecordForReservation } =
        useTreatmentNavigation()
    const { openReservationDetail } = useReservationNavigation()

    const handleDetailClick = () => {
        openReservationDetail(reservation.id)
    }

    const handleRecordClick = () => {
        openOrCreateTreatmentRecordForReservation(reservation.id)
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
                                    variant="primary"
                                    onClick={handleDetailClick}
                                >
                                    詳細
                                </Button>
                                <Button
                                    size="sm"
                                    variant={
                                        reservation.record
                                            ? 'success'
                                            : 'outline-success'
                                    }
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
function openReservationDetail(id: string) {
    throw new Error('Function not implemented.')
}
