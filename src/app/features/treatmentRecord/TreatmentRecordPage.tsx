import { useAppSelector } from '@/app/hooks'
import { filterTreatmentRecords } from '@/app/store/treatmentRecordSlice'
import { getStaffs } from '@/app/store/userSlice'
import { User } from '@/app/types/user'
import { useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import {
    TreatmentRecord,
    TreatmentRecordSearchConditions,
} from '../../types/treatmentRecord'
import SearchSection from './components/SearchSection'

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
    const [searchCondition, setSearchCondition] =
        useState<TreatmentRecordSearchConditions>({
            staffId: 'all',
            searchText: '',
        })

    const treatmentRecords = useAppSelector((state) =>
        filterTreatmentRecords(
            state,
            searchCondition.staffId,
            searchCondition.searchText
        )
    )
    const staffs = useAppSelector((state) => getStaffs(state))

    const groupedRecords = groupByDate(treatmentRecords)
    const sortedDates = Object.keys(groupedRecords).sort((a, b) =>
        b.localeCompare(a)
    ) // 新しい日付が上

    return (
        <Container className="my-4">
            <SearchSection
                conditions={searchCondition}
                onConditionsChange={setSearchCondition}
            />
            <div style={{ marginTop: '160px' }}>
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
                                            <Card.Footer>
                                                <small className="text-muted">
                                                    対応スタッフ:{' '}
                                                    {
                                                        staffs.find(
                                                            (staff: User) =>
                                                                staff.id ===
                                                                record.staffId
                                                        )!.name
                                                    }
                                                </small>
                                                {record.attached_images.length >
                                                    0 && (
                                                    <small className="text-muted">
                                                        添付画像:{' '}
                                                        {
                                                            record
                                                                .attached_images
                                                                .length
                                                        }
                                                        件
                                                    </small>
                                                )}
                                            </Card.Footer>
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
