import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { useLogin } from '@/app/hooks/useLogin'
import { popPage, pushPage } from '@/app/store/navigationSlice'
import { setSelectedReservation } from '@/app/store/reservationSlice'
import { Page } from '@/app/types/Page'
import ReservationDetail from './components/ReservationDetail'

export default function ReservationDetailPage() {
    const dispatch = useAppDispatch()
    const reservation = useAppSelector(
        (state) => state.reservation.selectedReservation
    )!
    const { isManager, isOffice, loginUser } = useLogin()

    const canEdit =
        isManager || isOffice || reservation.staff.id === loginUser!.id

    const handleEdit = () => {
        dispatch(setSelectedReservation(reservation))
        dispatch(pushPage(Page.RESERVE_EDIT))
    }

    const handleDelete = () => {
        console.log('del')
    }

    const handleBack = () => {
        dispatch(popPage())
    }

    return (
        <div>
            <h5 className="text-center mb-3">予約詳細</h5>
            {reservation && (
                <ReservationDetail
                    reservation={reservation}
                    onEdit={canEdit ? handleEdit : undefined}
                    onDelete={canEdit ? handleDelete : undefined}
                    onBack={handleBack}
                />
            )}
        </div>
    )
}
