import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { pushPage } from '@/app/store/navigationSlice'
import {
    setRecordDraft,
    setRecordOnView,
} from '@/app/store/treatmentRecordSlice'
import { Page } from '@/app/types/Page'
import { useCallback } from 'react'
import { v4 } from 'uuid'

export const useTreatmentForm = () => {
    const dispatch = useAppDispatch()

    const records = useAppSelector((state) => state.treatmentRecords.records)
    const reservations = useAppSelector(
        (state) => state.reservation.reservations
    )

    const openOrCreateTreatmentRecordForReservation = useCallback(
        (reservationId: string) => {
            const reservation = reservations.find(
                (r) => r.id === reservationId
            )!

            const targetRecord = records.find(
                (r) =>
                    r.for_reservation && r.for_reservation.id === reservationId
            )

            if (targetRecord) {
                dispatch(setRecordOnView(targetRecord.id))
                dispatch(pushPage(Page.TREATMENT_RECORD_DETAIL))
            } else {
                dispatch(
                    setRecordDraft({
                        id: v4(),
                        for_reservation: reservation,
                        content: '',
                        attached_images: [],
                        client: reservation.client,
                        staffId: reservation.staff.id,
                        date: reservation.date,
                    })
                )
                dispatch(pushPage(Page.TREATMENT_RECORD_CREATE))
            }
        },
        [dispatch, records, reservations]
    )

    return {
        openOrCreateTreatmentRecordForReservation,
    }
}
