import { useAppSelector } from '@/app/hooks'
import { getStaffs } from '@/app/store/userSlice'
import { TreatmentRecord } from '@/app/types/treatmentRecord'
import { Button, ButtonGroup, Card, Col, Image, Row } from 'react-bootstrap'

interface TreatmentRecordCardProps {
    record: TreatmentRecord
    onViewDetail?: (record: TreatmentRecord) => void
}

export default function TreatmentRecordCard({
    record,
    onViewDetail,
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
                </Row>
                {record.attached_images.length > 0 && (
                    <Row className="mb-2">
                        <Col>
                            <div className="d-flex gap-1">
                                {record.attached_images
                                    .slice(0, 3)
                                    .map((image, index) => (
                                        <Image
                                            key={index}
                                            src={image}
                                            alt={`添付画像 ${index + 1}`}
                                            width={60}
                                            height={60}
                                            className="rounded"
                                            style={{ objectFit: 'cover' }}
                                        />
                                    ))}
                                {record.attached_images.length > 3 && (
                                    <div
                                        className="d-flex align-items-center justify-content-center rounded"
                                        style={{
                                            width: 60,
                                            height: 60,
                                            backgroundColor: '#f8f9fa',
                                            fontSize: '0.75rem',
                                            color: '#6c757d',
                                        }}
                                    >
                                        +{record.attached_images.length - 3}
                                    </div>
                                )}
                            </div>
                        </Col>
                    </Row>
                )}
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
                        </ButtonGroup>
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
    )
}
