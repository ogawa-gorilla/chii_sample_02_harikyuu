import { useAppSelector } from '@/app/hooks'
import { getStaffs } from '@/app/store/userSlice'
import { TreatmentRecord } from '@/app/types/treatmentRecord'
import { Button, ButtonGroup, Card, Col, Row } from 'react-bootstrap'

interface TreatmentRecordCardProps {
    record: TreatmentRecord
    onViewDetail?: (record: TreatmentRecord) => void
    onEdit?: (record: TreatmentRecord) => void
}

export default function TreatmentRecordCard({
    record,
    onViewDetail,
    onEdit,
}: TreatmentRecordCardProps) {
    const staffs = useAppSelector((state) => getStaffs(state))

    return (
        <Card className="h-100">
            <Card.Body>
                <Card.Title>{record.client}</Card.Title>
                <Card.Subtitle className="text-muted small">
                    {record.date}
                </Card.Subtitle>
                <Card.Text>{record.content}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <Row className="mb-2">
                    <Col>
                        <small className="text-muted">
                            対応スタッフ:{' '}
                            {
                                staffs.find(
                                    (staff) => staff.id === record.staffId
                                )!.name
                            }
                        </small>
                    </Col>
                    <Col>
                        {record.attached_images.length > 0 && (
                            <small className="text-muted">
                                添付画像: {record.attached_images.length}件
                            </small>
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ButtonGroup size="sm" className="w-100">
                            {onViewDetail && (
                                <Button
                                    variant="outline-primary"
                                    onClick={() => onViewDetail(record)}
                                    className="flex-fill"
                                >
                                    詳細
                                </Button>
                            )}
                            {onEdit && (
                                <Button
                                    variant="outline-secondary"
                                    onClick={() => onEdit(record)}
                                    className="flex-fill"
                                >
                                    編集
                                </Button>
                            )}
                        </ButtonGroup>
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
    )
}
