import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { popPage } from '@/app/store/navigationSlice'
import { getStaffs } from '@/app/store/userSlice'
import { Reservation, ReservationFormData } from '@/app/types/reservation'
import ReservationForm from './components/ReservationForm'
import useReservationEditor from './hooks/useReservationEditor'
import { useReservationNavigation } from './hooks/useReservationNavigation'

export default function ReservationEditPage() {
    const dispatch = useAppDispatch()
    const selectedReservation = useAppSelector(
        (state) => state.reservation.selectedReservation
    )!
    const allStaffs = useAppSelector(getStaffs)
    const { updateReservationEntry } = useReservationEditor()
    const { openReservationDetail } = useReservationNavigation()

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
        openReservationDetail(reservation.id)
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
