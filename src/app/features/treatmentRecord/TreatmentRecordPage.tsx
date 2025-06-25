import { useAppSelector } from '@/app/hooks'
import { filterTreatmentRecords } from '@/app/store/treatmentRecordSlice'
import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import {
    TreatmentRecord,
    TreatmentRecordSearchConditions,
} from '../../types/treatmentRecord'
import SearchSection from './components/SearchSection'
import TreatmentRecordCard from './components/TreatmentRecordCard'

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
            <div style={{ marginTop: '200px' }}>
                {sortedDates.map((date) => (
                    <div key={date} className="mb-5">
                        <h5 className="mb-3 border-bottom pb-2">{date}</h5>
                        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                            {groupedRecords[date].map(
                                (record: TreatmentRecord) => (
                                    <Col key={record.id}>
                                        <TreatmentRecordCard
                                            record={record}
                                            onViewDetail={() => {}}
                                            onEdit={() => {}}
                                        />
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
