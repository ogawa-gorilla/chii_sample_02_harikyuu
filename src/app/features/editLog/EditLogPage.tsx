import ExplanationCard from '@/app/components/common/ExplanationCard'
import { useAppSelector } from '@/app/hooks'
import { EditLogTarget } from '@/app/types/EditLog'
import dayjs from 'dayjs'
import { Card, Container, ListGroup } from 'react-bootstrap'

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
    const editLogs = useAppSelector((state) => state.editLog.editLogs)

    return (
        <Container className="my-4">
            <h4 className="mb-4">編集履歴</h4>

            <ExplanationCard
                title="説明"
                text="編集履歴ページは、データの編集を行ったユーザー、編集の内容、編集の日時を表示します。"
            />

            <Card>
                <Card.Body className="p-0">
                    <ListGroup variant="flush">
                        {editLogs.map((editLog, index) => (
                            <ListGroup.Item key={index} className="border-0">
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
                                    {editLog.edits.map((edit, editIndex) => (
                                        <div key={editIndex} className="mb-1">
                                            <span className="text-dark small">
                                                • {edit}
                                            </span>
                                        </div>
                                    ))}
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
        </Container>
    )
}

export default EditLogPage
