import { EditLogTag } from '@/app/types/EditLog'
import { Reservation } from '@/app/types/reservation'
import { Button, Modal } from 'react-bootstrap'
import ReservationDetail from '../../reservation/components/ReservationDetail'

interface ReservationRecoveryModalProps {
    show: boolean
    backupReservation: Reservation | null
    tags: EditLogTag[]
    onHide: () => void
    onRestore: () => void
}

export default function ReservationRecoveryModal({
    show,
    backupReservation,
    tags,
    onHide,
    onRestore,
}: ReservationRecoveryModalProps) {
    const isDelete = tags.includes(EditLogTag.DELETE)

    let message = isDelete
        ? '削除された予約を復元しますか？'
        : '以下の予約を復元しますか？'

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>予約復元</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{message}</p>
                {backupReservation && (
                    <ReservationDetail reservation={backupReservation} />
                )}
            </Modal.Body>
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
