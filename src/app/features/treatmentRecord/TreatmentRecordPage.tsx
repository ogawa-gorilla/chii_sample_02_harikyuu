import ExplanationCard from '@/app/components/common/ExplanationCard'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { useLogin } from '@/app/hooks/useLogin'
import { pushPage } from '@/app/store/navigationSlice'
import {
    filterTreatmentRecords,
    resetSearchConditions,
    setRecordOnView,
    updateSearchConditions,
} from '@/app/store/treatmentRecordSlice'
import { NavigationAction } from '@/app/types/NavigationAction'
import { Page } from '@/app/types/Page'
import { useEffect } from 'react'
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
    const dispatch = useAppDispatch()
    const { loginUser, isStaff } = useLogin()
    const searchConditions = useAppSelector(
        (state) => state.treatmentRecords.searchConditions
    )
    const treatmentRecords = useAppSelector((state) =>
        filterTreatmentRecords(state)
    )

    const lastAction = useAppSelector((state) => state.navigation.lastAction)

    useEffect(() => {
        if (lastAction === NavigationAction.MOVE_TO) {
            dispatch(resetSearchConditions(isStaff ? loginUser!.id : null))
        }
    }, [lastAction, dispatch, isStaff, loginUser])

    const groupedRecords = groupByDate(treatmentRecords)
    const sortedDates = Object.keys(groupedRecords).sort((a, b) =>
        b.localeCompare(a)
    ) // 新しい日付が上

    const handleConditionsChange = (
        conditions: TreatmentRecordSearchConditions
    ) => {
        dispatch(updateSearchConditions(conditions))
    }

    const handleViewDetail = (recordId: string) => {
        dispatch(setRecordOnView(recordId))
        dispatch(pushPage(Page.TREATMENT_RECORD_DETAIL))
    }

    return (
        <Container className="my-4">
            <SearchSection
                conditions={searchConditions}
                onConditionsChange={handleConditionsChange}
            />
            <div style={{ marginTop: '200px' }}>
                <ExplanationCard
                    title="施術記録画面"
                    text={
                        '施術記録の一覧です。\n施術記録の詳細は、クリックすることで確認できます。'
                    }
                />
                {sortedDates.map((date) => (
                    <div key={date} className="mb-5">
                        <h5 className="mb-3 border-bottom pb-2">{date}</h5>
                        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                            {groupedRecords[date].map(
                                (record: TreatmentRecord) => (
                                    <Col key={record.id}>
                                        <TreatmentRecordCard
                                            record={record}
                                            onViewDetail={() =>
                                                handleViewDetail(record.id)
                                            }
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
