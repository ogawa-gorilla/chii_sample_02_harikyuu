import { useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { TreatmentRecord } from '../../types/treatmentRecord'
import SearchSection from './components/SearchSection'

const treatmentRecords: TreatmentRecord[] = [
    {
        id: '1',
        client: '田中 太郎',
        staff_id: '1',
        date: '2025-06-01',
        content: '肩こりの鍼治療。肩甲骨まわりに反応点多数あり。',
        attached_images: [],
    },
    {
        id: '2',
        client: '鈴木 花子',
        staff_id: '2',
        date: '2025-06-03',
        content: '腰痛への施術。仙腸関節周辺に重点的にアプローチ。',
        attached_images: [],
    },
    {
        id: '3',
        client: '佐藤 健',
        staff_id: '1',
        date: '2025-06-03',
        content: '首のこり。後頚部に硬結があり。',
        attached_images: [],
    },
    {
        id: '4',
        client: '山田 真一',
        staff_id: '2',
        date: '2025-06-04',
        content: '背中の張り。脊柱起立筋にアプローチ。',
        attached_images: [],
    },
    {
        id: '5',
        client: '井上 美咲',
        staff_id: '1',
        date: '2025-06-05',
        content: '冷え性への対応。足首周辺に施術。',
        attached_images: [],
    },
    {
        id: '6',
        client: '中村 海斗',
        staff_id: '3',
        date: '2025-06-05',
        content: 'ストレスによる不眠。頭部と耳周辺の施術。',
        attached_images: [],
    },
    {
        id: '7',
        client: '高橋 優',
        staff_id: '2',
        date: '2025-06-01',
        content: '肩関節の可動域改善。',
        attached_images: [],
    },
]

// グループ化（date → array of records）
const groupByDate = (records: TreatmentRecord[]) => {
    return records.reduce((acc, record) => {
        if (!acc[record.date]) {
            acc[record.date] = []
        }
        acc[record.date].push(record)
        return acc
    }, {} as Record<string, TreatmentRecord[]>)
}

const TreatmentRecordList = () => {
    const groupedRecords = groupByDate(treatmentRecords)
    const sortedDates = Object.keys(groupedRecords).sort((a, b) =>
        b.localeCompare(a)
    ) // 新しい日付が上

    const [selectedStaff, setSelectedStaff] = useState('all')

    return (
        <Container className="my-4">
            <SearchSection
                selectedStaff={selectedStaff}
                onStaffChange={setSelectedStaff}
            />
            <div style={{ marginTop: '140px' }}>
                {sortedDates.map((date) => (
                    <div key={date} className="mb-5">
                        <h5 className="mb-3 border-bottom pb-2">{date}</h5>
                        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                            {groupedRecords[date].map(
                                (record: TreatmentRecord) => (
                                    <Col key={record.id}>
                                        <Card className="h-100">
                                            <Card.Body>
                                                <Card.Title>
                                                    {record.client}
                                                </Card.Title>
                                                <Card.Text>
                                                    {record.content}
                                                </Card.Text>
                                            </Card.Body>
                                            {record.attached_images.length >
                                                0 && (
                                                <Card.Footer>
                                                    <small className="text-muted">
                                                        添付画像:{' '}
                                                        {
                                                            record
                                                                .attached_images
                                                                .length
                                                        }
                                                        件
                                                    </small>
                                                </Card.Footer>
                                            )}
                                        </Card>
                                    </Col>
                                )
                            )}
                        </Row>
                    </div>
                ))}
            </div>
        </Container>
    )
}

export default TreatmentRecordList
