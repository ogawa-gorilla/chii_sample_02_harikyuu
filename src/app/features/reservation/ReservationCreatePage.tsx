import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { popPage, pushPage } from '@/app/store/navigationSlice'
import { setSelectedReservation } from '@/app/store/reservationSlice'
import { Page } from '@/app/types/Page'
import { Reservation, ReservationFormData } from '@/app/types/reservation'
import { v4 } from 'uuid'
import ReservationForm from './components/ReservationForm'
import useReservationEditor from './hooks/useReservationEditor'

export default function ReservationCreatePage() {
    const dispatch = useAppDispatch()
    const reservationDraft = useAppSelector(
        (state) => state.reservation.reservationDraft
    )
    const allStaffs = useAppSelector((state) => state.user.users)
    const { createReservationEntry } = useReservationEditor()

    const handleSubmit = (formData: ReservationFormData) => {
        const reservation: Reservation = {
            id: v4(),
            staff: allStaffs.find((staff) => staff.id === formData.staffId)!,
            client: formData.clientName,
            date: formData.date,
            time: formData.hour,
            duration: 1,
            status: 'pending',
            notes: formData.notes,
        }
        createReservationEntry(reservation)

        // 新しく作成した予約オブジェクトを直接使用して詳細ページに遷移
        dispatch(setSelectedReservation(reservation))
        dispatch(pushPage(Page.RESERVE_DETAIL))
    }

    const handleCancel = () => {
        dispatch(popPage())
    }

    return (
        <div>
            <h5 className="text-center mb-3">予約作成</h5>
            {reservationDraft && (
                <ReservationForm
                    scheduledDate={reservationDraft.date}
                    scheduledTime={reservationDraft.time}
                    clientName={''}
                    notes={''}
                    staff={reservationDraft.staff}
                    availableStaffs={reservationDraft.availableStaffs}
                    reservationId={null}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            )}
        </div>
    )
}
