import { useAppSelector } from '@/app/hooks'
import { EditLogTag } from '@/app/types/EditLog'
import { TreatmentRecord } from '@/app/types/treatmentRecord'
import { Button, Modal } from 'react-bootstrap'
import TreatmentRecordSection from '../../treatmentRecord/components/TreatmentRecordSection'

interface TreatmentRecordRecoveryModalProps {
    show: boolean
    backupTreatmentRecord: TreatmentRecord | null
    tags: EditLogTag[]
    onHide: () => void
    onRestore: () => void
}

export default function TreatmentRecordRecoveryModal({
    show,
    backupTreatmentRecord,
    tags,
    onHide,
    onRestore,
}: TreatmentRecordRecoveryModalProps) {
    const isDelete = tags.includes(EditLogTag.DELETE)

    const recordAlreadyExists = useAppSelector(
        (state) => state.treatmentRecords.records
    ).find(
        (r) =>
            r.for_reservation &&
            backupTreatmentRecord?.for_reservation &&
            r.for_reservation.id === backupTreatmentRecord.for_reservation.id &&
            r.id !== backupTreatmentRecord?.id
    )

    let message = isDelete
        ? '削除された施術記録を復元しますか？'
        : '施術記録を以下の状態に復元しますか？'

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>施術記録復元</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{message}</p>
                {backupTreatmentRecord && (
                    <TreatmentRecordSection
                        record={backupTreatmentRecord}
                        onImageClick={() => {}}
                    />
                )}
            </Modal.Body>

            {recordAlreadyExists && (
                <Modal.Body className="bg-danger-subtle">
                    <p className="text-danger">
                        その予約にはすでに施術記録が存在します。復元すると、以下の内容は失われます。
                    </p>
                    <TreatmentRecordSection
                        record={recordAlreadyExists}
                        onImageClick={() => {}}
                    />
                </Modal.Body>
            )}
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    キャンセル
                </Button>
                <Button variant="primary" onClick={onRestore}>
                    復元する
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
