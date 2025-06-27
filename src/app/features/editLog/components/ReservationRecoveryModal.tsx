import { useAppSelector } from '@/app/hooks'
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

    const doublebookedReservation = useAppSelector(
        (state) => state.reservation.reservations
    ).find(
        (r) =>
            r.date === backupReservation?.date &&
            r.time === backupReservation?.time &&
            r.staff.id === backupReservation?.staff.id
    )

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

            {doublebookedReservation && (
                <Modal.Body className="bg-danger-subtle">
                    <p className="text-danger">
                        この予約は以下の予約と重複しています。本当に復元しますか？
                    </p>
                    <ReservationDetail reservation={doublebookedReservation} />
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
