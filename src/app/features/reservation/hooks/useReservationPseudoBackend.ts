import { useAppSelector } from '@/app/hooks'
import { Reservation } from '@/app/types/reservation'
import { useCallback } from 'react'

export const useReservationPseudoBackend = () => {
    const treatmentRecords = useAppSelector(
        (state) => state.treatmentRecords.records
    )

    const hasTreatmentRecord = useCallback(
        (reservation: Reservation) => {
            return treatmentRecords.some(
                (record) =>
                    record.for_reservation &&
                    record.for_reservation.id === reservation.id
            )
        },
        [treatmentRecords]
    )

    return { hasTreatmentRecord }
}
