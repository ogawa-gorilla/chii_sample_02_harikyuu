import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { deleteEditLog } from '@/app/store/editLogSlice'
import { setCurrentPage } from '@/app/store/navigationSlice'
import { setSelectedReservation } from '@/app/store/reservationSlice'
import { EditLog, EditLogTag, EditLogTarget } from '@/app/types/EditLog'
import { Page } from '@/app/types/Page'
import { Reservation } from '@/app/types/reservation'
import { TreatmentRecord } from '@/app/types/treatmentRecord'
import useReservationEditor from '../../reservation/hooks/useReservationEditor'
import { useTreatmentForm } from '../../treatmentRecord/hooks/useTreatmentForm'
import ReservationRecoveryModal from './ReservationRecoveryModal'
import TreatmentRecordRecoveryModal from './TreatmentRecordRecoveryModal'

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

    let showTreatmentRecordRecoveryModal = false
    let backupTreatmentRecord: TreatmentRecord | null = null

    const reservations = useAppSelector(
        (state) => state.reservation.reservations
    )

    const { createReservationEntry, updateReservationEntry } =
        useReservationEditor()

    const { updateRecordEntry } = useTreatmentForm()

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
            case EditLogTarget.TREATMENT_RECORD:
                const treatmentRecord = JSON.parse(
                    targetLog.backup!
                ) as TreatmentRecord
                updateRecordEntry(treatmentRecord, [EditLogTag.RESTORE])
                dispatch(deleteEditLog(targetLog.id))
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
        case EditLogTarget.TREATMENT_RECORD:
            showTreatmentRecordRecoveryModal = true
            backupTreatmentRecord = JSON.parse(
                targetLog.backup
            ) as TreatmentRecord
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
            <TreatmentRecordRecoveryModal
                show={showTreatmentRecordRecoveryModal}
                backupTreatmentRecord={backupTreatmentRecord}
                tags={targetLog.tags}
                onHide={onHide}
                onRestore={handleRestore}
            />
        </div>
    )
}
