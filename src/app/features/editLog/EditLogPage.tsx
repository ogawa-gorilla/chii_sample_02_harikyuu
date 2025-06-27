import ExplanationCard from '@/app/components/common/ExplanationCard'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { setSearchConditions } from '@/app/store/editLogSlice'
import { EditLog, EditLogSearchConditions } from '@/app/types/EditLog'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import { Card, Container, ListGroup } from 'react-bootstrap'
import EditLogEntry from './components/EditLogEntry'
import RecoveryModule from './components/RecoveryModule'
import SearchSection from './components/SearchSection'
import { logMatches } from './utils/logMatches'

const EditLogPage = () => {
    const dispatch = useAppDispatch()
    const editLogs = useAppSelector((state) => state.editLog.editLogs)
    const searchConditions = useAppSelector(
        (state) => state.editLog.searchConditions
    )
    const [isSearchSectionOpen, setIsSearchSectionOpen] = useState(true)
    const [targetLog, setTargetLog] = useState<EditLog | null>(null)

    const handleSearchConditionsChange = (
        conditions: EditLogSearchConditions
    ) => {
        dispatch(setSearchConditions(conditions))
    }

    const handleSearchSectionToggle = (isOpen: boolean) => {
        setIsSearchSectionOpen(isOpen)
    }

    const handleBackupRequest = (editLog: EditLog) => {
        setTargetLog(editLog)
    }

    const filteredEditLogs = useMemo(() => {
        return editLogs
            .filter((log) => logMatches(log, searchConditions))
            .sort((a, b) => dayjs(b.editedAt).diff(dayjs(a.editedAt)))
    }, [editLogs, searchConditions])

    // SearchSectionの状態に応じて上部余白を調整
    const topMargin = isSearchSectionOpen ? '280px' : '80px'

    return (
        <Container className="my-4">
            <RecoveryModule
                targetLog={targetLog}
                onHide={() => setTargetLog(null)}
            />
            <div style={{ marginTop: topMargin }}>
                <h4 className="mb-4">編集履歴</h4>

                <ExplanationCard
                    title="説明"
                    text={
                        '編集履歴ページは、データの編集を行ったユーザー、編集の内容、編集の日時を表示します。\n削除されたデータの復元もここで行えます。'
                    }
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
                                <EditLogEntry
                                    key={index}
                                    editLog={editLog}
                                    onBackupRequest={() =>
                                        handleBackupRequest(editLog)
                                    }
                                />
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
