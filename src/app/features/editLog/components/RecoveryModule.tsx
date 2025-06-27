import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { deleteEditLog } from '@/app/store/editLogSlice'
import { setCurrentPage } from '@/app/store/navigationSlice'
import { setSelectedReservation } from '@/app/store/reservationSlice'
import { EditLog, EditLogTag, EditLogTarget } from '@/app/types/EditLog'
import { Page } from '@/app/types/Page'
import { Reservation } from '@/app/types/reservation'
import useReservationEditor from '../../reservation/hooks/useReservationEditor'
import ReservationRecoveryModal from './ReservationRecoveryModal'

interface RecoveryModuleProps {
    targetLog: EditLog | null
    onHide: () => void
}

export default function RecoveryModule({
    targetLog,
    onHide,
}: RecoveryModuleProps) {
    if (!targetLog || !targetLog.backup) {
        return null
    }

    const dispatch = useAppDispatch()

    let showReservationRecoveryModal = false
    let backupReservation: Reservation | null = null

    const reservations = useAppSelector(
        (state) => state.reservation.reservations
    )

    const { createReservationEntry, updateReservationEntry } =
        useReservationEditor()

    const handleRestore = () => {
        switch (targetLog.editTarget) {
            case EditLogTarget.RESERVATION:
                const reservation = JSON.parse(targetLog.backup!) as Reservation

                if (reservations.some((r) => r.id === reservation.id)) {
                    updateReservationEntry(reservation, [EditLogTag.RESTORE])
                } else {
                    createReservationEntry(reservation, [EditLogTag.RESTORE])
                }
                dispatch(deleteEditLog(targetLog.id))
                dispatch(setSelectedReservation(reservation))
                dispatch(setCurrentPage(Page.RESERVE_DETAIL))
                break
            default:
                break
        }
        onHide()
    }

    switch (targetLog.editTarget) {
        case EditLogTarget.RESERVATION:
            showReservationRecoveryModal = true
            backupReservation = JSON.parse(targetLog.backup) as Reservation
            break
        default:
            break
    }

    return (
        <div>
            <ReservationRecoveryModal
                show={showReservationRecoveryModal}
                backupReservation={backupReservation}
                tags={targetLog.tags}
                onHide={onHide}
                onRestore={handleRestore}
            />
        </div>
    )
}
