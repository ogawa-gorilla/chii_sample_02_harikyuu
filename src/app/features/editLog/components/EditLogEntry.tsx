import { EditLog, EditLogTag, EditLogTarget } from '@/app/types/EditLog'
import dayjs from 'dayjs'
import { Button, ListGroup } from 'react-bootstrap'

interface EditLogEntryProps {
    editLog: EditLog
    onBackupRequest: () => void
}

export default function EditLogEntry({
    editLog,
    onBackupRequest,
}: EditLogEntryProps) {
    const getTagClass = (tag: EditLogTag) => {
        const tagMap: { [key: string]: string } = {
            [EditLogTag.DELETE]: 'bg-danger',
            [EditLogTag.EDIT]: 'bg-primary',
            [EditLogTag.CREATE]: 'bg-success',
            [EditLogTag.RESTORE]: 'bg-warning',
        }
        return tagMap[tag] || ''
    }

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

    return (
        <ListGroup.Item key={editLog.id} className="border-1">
            <div className="d-flex justify-content-between align-items-start mb-2">
                <div className="d-flex align-items-center">
                    <span
                        className="badge bg-secondary me-2"
                        style={{ fontSize: '0.75rem' }}
                    >
                        {getEditTargetDisplayName(editLog.editTarget)}
                    </span>
                    {editLog.tags.map((tag) => (
                        <span
                            key={tag}
                            className={'badge me-2 ' + getTagClass(tag)}
                            style={{
                                fontSize: '0.75rem',
                            }}
                        >
                            {tag}
                        </span>
                    ))}
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
                        <span className="text-dark small">• {edit}</span>
                    </div>
                ))}
            </div>
            {editLog.backup && (
                <div className="ms-0">
                    <Button
                        variant="success"
                        size="sm"
                        onClick={onBackupRequest}
                    >
                        バックアップを復元
                    </Button>
                </div>
            )}
        </ListGroup.Item>
    )
}
