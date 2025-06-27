import { useAppSelector } from '@/app/hooks'
import { TreatmentRecord } from '@/app/types/treatmentRecord'
import { Card, Col, Image, Row } from 'react-bootstrap'

interface TreatmentRecordSectionProps {
    record: TreatmentRecord
    onImageClick: (imageUrl: string) => void
}

export default function TreatmentRecordSection({
    record,
    onImageClick,
}: TreatmentRecordSectionProps) {
    const staff = useAppSelector((state) => state.user.users).find(
        (s) => s.id === record.staffId
    )!

    return (
        <Card>
            <Card.Body>
                <Card.Text>
                    <strong>クライアント:</strong> {record.client}
                </Card.Text>
                <Card.Text>
                    <strong>施術日:</strong> {record.date}
                </Card.Text>
                <Card.Text>
                    <strong>担当スタッフ:</strong> {staff.name}
                </Card.Text>
                <Card.Text>
                    <strong>施術内容:</strong>
                    <br />
                    {record.content}
                </Card.Text>

                {record.attached_images.length > 0 && (
                    <>
                        <strong>添付画像:</strong>
                        <Row className="mt-3">
                            {record.attached_images.map((imgUrl, idx) => (
                                <Col
                                    key={idx}
                                    xs={6}
                                    md={4}
                                    lg={3}
                                    className="mb-3"
                                >
                                    <Image
                                        src={imgUrl}
                                        thumbnail
                                        fluid
                                        style={{
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => onImageClick(imgUrl)}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </>
                )}
            </Card.Body>
        </Card>
    )
}
