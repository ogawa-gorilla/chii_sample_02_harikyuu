import ExplanationCard from '@/app/components/common/ExplanationCard'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { setSearchConditions } from '@/app/store/editLogSlice'
import { EditLogSearchConditions, EditLogTarget } from '@/app/types/EditLog'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import { Card, Container, ListGroup } from 'react-bootstrap'
import SearchSection from './components/SearchSection'

// 編集対象の日本語表示名を取得
const getEditTargetDisplayName = (editTarget: EditLogTarget): string => {
    const targetMap: { [key: string]: string } = {
        [EditLogTarget.RESERVATION]: '予約',
        [EditLogTarget.SHIFT]: 'シフト',
        [EditLogTarget.TREATMENT_RECORD]: '施術記録',
    }
    return targetMap[editTarget] || editTarget
}

// 日付をフォーマット
const formatDate = (dateString: string): string => {
    return dayjs(dateString).format('YYYY年MM月DD日 HH:mm')
}

const EditLogPage = () => {
    const dispatch = useAppDispatch()
    const editLogs = useAppSelector((state) => state.editLog.editLogs)
    const searchConditions = useAppSelector(
        (state) => state.editLog.searchConditions
    )
    const [isSearchSectionOpen, setIsSearchSectionOpen] = useState(true)

    const handleSearchConditionsChange = (
        conditions: EditLogSearchConditions
    ) => {
        dispatch(setSearchConditions(conditions))
    }

    const handleSearchSectionToggle = (isOpen: boolean) => {
        setIsSearchSectionOpen(isOpen)
    }

    console.log(searchConditions)

    const filteredEditLogs = useMemo(() => {
        return editLogs
            .filter((editLog) => {
                const staffIdMatches =
                    searchConditions.staffId === 'all' ||
                    editLog.user.id === searchConditions.staffId
                const startDateSpecified = searchConditions.startDate !== ''
                const endDateSpecified = searchConditions.endDate !== ''
                const isAfterStartDate = dayjs(editLog.editedAt).isAfter(
                    dayjs(searchConditions.startDate)
                )
                const isBeforeEndDate = dayjs(editLog.editedAt).isBefore(
                    dayjs(searchConditions.endDate)
                )
                const dateMatches =
                    (!startDateSpecified || isAfterStartDate) &&
                    (!endDateSpecified || isBeforeEndDate)
                const typeSpecified = searchConditions.target !== null
                const typeMatches =
                    !typeSpecified ||
                    editLog.editTarget === searchConditions.target
                return staffIdMatches && dateMatches && typeMatches
            })
            .sort((a, b) => dayjs(b.editedAt).diff(dayjs(a.editedAt)))
    }, [editLogs, searchConditions])

    // SearchSectionの状態に応じて上部余白を調整
    const topMargin = isSearchSectionOpen ? '280px' : '80px'

    return (
        <Container className="my-4">
            <div style={{ marginTop: topMargin }}>
                <h4 className="mb-4">編集履歴</h4>

                <ExplanationCard
                    title="説明"
                    text="編集履歴ページは、データの編集を行ったユーザー、編集の内容、編集の日時を表示します。"
                />

                <SearchSection
                    conditions={searchConditions}
                    onConditionsChange={handleSearchConditionsChange}
                    onToggle={handleSearchSectionToggle}
                />

                <Card>
                    <Card.Body className="p-0">
                        <ListGroup variant="flush">
                            {filteredEditLogs.map((editLog, index) => (
                                <ListGroup.Item
                                    key={index}
                                    className="border-0"
                                >
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <div className="d-flex align-items-center">
                                            <span
                                                className="badge bg-primary me-2"
                                                style={{ fontSize: '0.75rem' }}
                                            >
                                                {getEditTargetDisplayName(
                                                    editLog.editTarget
                                                )}
                                            </span>
                                            <span className="text-muted small">
                                                {editLog.user.name}
                                            </span>
                                        </div>
                                        <span className="text-muted small">
                                            {formatDate(editLog.editedAt)}
                                        </span>
                                    </div>

                                    <div className="ms-0">
                                        {editLog.edits.map(
                                            (edit, editIndex) => (
                                                <div
                                                    key={editIndex}
                                                    className="mb-1"
                                                >
                                                    <span className="text-dark small">
                                                        • {edit}
                                                    </span>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card.Body>
                </Card>

                {editLogs.length === 0 && (
                    <Card>
                        <Card.Body className="text-center text-muted">
                            <p className="mb-0">編集履歴がありません</p>
                        </Card.Body>
                    </Card>
                )}
            </div>
        </Container>
    )
}

export default EditLogPage
