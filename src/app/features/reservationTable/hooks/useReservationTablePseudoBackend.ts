import { useAppSelector } from '@/app/hooks'
import { useMemo } from 'react'
import { ReservationTableReservation } from '../types/ReservationTableReservation'

export const useReservationTablePseudoBackend = () => {
    const reservations = useAppSelector(
        (state) => state.reservation.reservations
    )
    const treatmentRecords = useAppSelector(
        (state) => state.treatmentRecords.records
    )

    const getTableReservations: ReservationTableReservation[] = useMemo(() => {
        const reservationsWithRecords = reservations.map((r) => {
            const record = treatmentRecords.find(
                (tr) => tr.for_reservation?.id === r.id
            )
            return {
                ...r,
                staff: r.staff.name,
                recordId: record ? record.id : undefined,
            }
        })
        return reservationsWithRecords
    }, [reservations, treatmentRecords])

    return {
        getTableReservations,
    }
}
