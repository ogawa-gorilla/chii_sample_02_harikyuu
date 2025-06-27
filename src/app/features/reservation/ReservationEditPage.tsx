import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { popPage, setCurrentPage } from '@/app/store/navigationSlice'
import { setSelectedReservation } from '@/app/store/reservationSlice'
import { getStaffs } from '@/app/store/userSlice'
import { Page } from '@/app/types/Page'
import { Reservation, ReservationFormData } from '@/app/types/reservation'
import ReservationForm from './components/ReservationForm'
import useReservationEditor from './hooks/useReservationEditor'

export default function ReservationEditPage() {
    const dispatch = useAppDispatch()
    const selectedReservation = useAppSelector(
        (state) => state.reservation.selectedReservation
    )!
    const allStaffs = useAppSelector(getStaffs)
    const { updateReservationEntry } = useReservationEditor()

    const handleSubmit = (formData: ReservationFormData) => {
        const reservation: Reservation = {
            id: selectedReservation.id,
            staff: allStaffs.find((staff) => staff.id === formData.staffId)!,
            client: formData.clientName,
            date: formData.date,
            time: formData.hour,
            duration: 1,
            status: 'pending',
            notes: formData.notes,
        }

        updateReservationEntry(reservation)
        dispatch(setSelectedReservation(reservation))
        dispatch(setCurrentPage(Page.RESERVE_DETAIL))
    }

    const handleCancel = () => {
        dispatch(popPage())
    }

    return (
        <div>
            <h5 className="text-center mb-3">予約編集</h5>
            <ReservationForm
                scheduledDate={selectedReservation.date}
                scheduledTime={selectedReservation.time}
                clientName={selectedReservation.client}
                notes={selectedReservation.notes}
                staff={selectedReservation.staff}
                availableStaffs={allStaffs}
                reservationId={selectedReservation.id}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
        </div>
    )
}
