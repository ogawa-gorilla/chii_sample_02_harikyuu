import { VIRTUAL_TODAY, VIRTUAL_TODAY_TIME } from '@/app/constants/virtualToday'
import { useAppSelector } from '@/app/hooks'
import { useMemo } from 'react'
import { DashboardReservation } from '../types/DashboardReservation'

export const useReservationPseudoBackend = () => {
    const reservations = useAppSelector(
        (state) => state.reservation.reservations
    )
    const loginUser = useAppSelector((state) => state.login.user)
    const treatmentRecords = useAppSelector(
        (state) => state.treatmentRecords.records
    )

    const reservationsForUser = useMemo(
        () => reservations.filter((r) => r.staff.id === loginUser!.id),
        [reservations, loginUser]
    )

    const getDashboardReservations: DashboardReservation[] = useMemo(() => {
        const reservationsWithRecords = reservationsForUser.map((r) => {
            const record = treatmentRecords.find(
                (tr) => tr.for_reservation?.id === r.id
            )
            return {
                ...r,
                record: record,
            }
        })
        return reservationsWithRecords
    }, [reservationsForUser, treatmentRecords])

    const getReservationsNeedRecords = useMemo(() => {
        return getDashboardReservations.filter(
            (r) =>
                !r.record &&
                (r.date < VIRTUAL_TODAY ||
                    (r.date === VIRTUAL_TODAY && r.time < VIRTUAL_TODAY_TIME))
        )
    }, [getDashboardReservations])

    return {
        getDashboardReservations,
        getReservationsNeedRecords,
    }
}
