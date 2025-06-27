import ExplanationCard from '@/app/components/common/ExplanationCard'
import { EditLog } from '@/app/types/EditLog'
import dayjs from 'dayjs'
import { Card, Container, ListGroup } from 'react-bootstrap'

// 仮のテストデータ（後で実際のデータ取得に置き換える）
const mockEditLogs: EditLog[] = [
    {
        editTarget: 'reservation',
        user: {
            id: '1',
            name: '鈴木',
            email: 'manager@example.com',
            role: '店長',
            password: 'suzuki',
            themeColor: '#0A192F',
        },
        editedAt: '2024-01-15T10:30:00Z',
        edits: [
            '予約時間を14:00から15:00に変更',
            'クライアント名を「田中」から「佐藤」に変更',
        ],
    },
    {
        editTarget: 'shift',
        user: {
            id: '2',
            name: '佐藤',
            email: 'sato@example.com',
            role: '施術スタッフ',
            password: 'sato',
            themeColor: '#2D0B5A',
        },
        editedAt: '2024-01-14T16:45:00Z',
        edits: ['勤務時間を9:00-18:00から10:00-19:00に変更'],
    },
    {
        editTarget: 'treatmentRecord',
        user: {
            id: '3',
            name: '山田',
            email: 'yamada@example.com',
            role: '施術スタッフ',
            password: 'yamada',
            themeColor: '#4B000F',
        },
        editedAt: '2024-01-13T12:20:00Z',
        edits: ['施術内容を追加', '注意事項を更新'],
    },
]

// 編集対象の日本語表示名を取得
const getEditTargetDisplayName = (editTarget: string): string => {
    const targetMap: { [key: string]: string } = {
        reservation: '予約',
        shift: 'シフト',
        treatmentRecord: '施術記録',
        user: 'ユーザー',
    }
    return targetMap[editTarget] || editTarget
}

// 日付をフォーマット
const formatDate = (dateString: string): string => {
    return dayjs(dateString).format('YYYY年MM月DD日 HH:mm')
}

const EditLogPage = () => {
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
                        {mockEditLogs.map((editLog, index) => (
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

            {mockEditLogs.length === 0 && (
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
