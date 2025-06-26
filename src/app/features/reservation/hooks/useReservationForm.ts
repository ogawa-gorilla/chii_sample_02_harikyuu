import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { pushPage } from '@/app/store/navigationSlice'
import { setSelectedReservation } from '@/app/store/reservationSlice'
import { Page } from '@/app/types/Page'
import { useCallback } from 'react'

export const useReservationForm = () => {
    const dispatch = useAppDispatch()
    const reservations = useAppSelector(
        (state) => state.reservation.reservations
    )

    const openReservationDetail = useCallback(
        (reservationId: string) => {
            const reservation = reservations.find(
                (r) => r.id === reservationId
            )!
            dispatch(setSelectedReservation(reservation))
            dispatch(pushPage(Page.RESERVE_DETAIL))
        },
        [dispatch, reservations]
    )

    return { openReservationDetail }
}
