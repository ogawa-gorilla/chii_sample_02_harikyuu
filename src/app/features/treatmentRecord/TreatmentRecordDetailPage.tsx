import { useAppDispatch } from '@/app/hooks'
import { popPage } from '@/app/store/navigationSlice'
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'

const record = {
    id: '1',
    client: '田中 太郎',
    staff_id: '1',
    date: '2025-06-01',
    content: '肩こりの鍼治療。肩甲骨まわりに反応点多数あり。',
    attached_images: [], // 例: ['image1.jpg', 'image2.jpg']
}

const TreatmentRecordDetail = () => {
    const dispatch = useAppDispatch()
    const handleBack = () => {
        dispatch(popPage())
    }

    return (
        <Container className="my-5">
            <Card>
                <Card.Header as="h5">施術記録詳細</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <strong>クライアント:</strong> {record.client}
                    </Card.Text>
                    <Card.Text>
                        <strong>施術日:</strong> {record.date}
                    </Card.Text>
                    <Card.Text>
                        <strong>担当スタッフID:</strong> {record.staff_id}
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
                                        <Image src={imgUrl} thumbnail fluid />
                                    </Col>
                                ))}
                            </Row>
                        </>
                    )}
                </Card.Body>
                <Card.Footer>
                    <Button variant="secondary" onClick={handleBack}>
                        戻る
                    </Button>
                </Card.Footer>
            </Card>
        </Container>
    )
}

export default TreatmentRecordDetail
