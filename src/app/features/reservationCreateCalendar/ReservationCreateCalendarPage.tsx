import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { useLogin } from '@/app/hooks/useLogin'
import { pushPage } from '@/app/store/navigationSlice'
import { setDraft, setSelectedReservation } from '@/app/store/reservationSlice'
import { getStaffs } from '@/app/store/userSlice'
import { Page } from '@/app/types/Page'
import { Reservation } from '@/app/types/reservation'
import { User } from '@/app/types/user'
import { useState } from 'react'
import { Container } from 'react-bootstrap'
import ReservationCreateCalendarForAllSection from './components/forAllStaffs/ReservationCreateCalendarForAllSection'
import ReservationCreateCalendarSection from './components/forAStaff/ReservationCreateCalendarSection'
import StaffSelector from './components/StaffSelector'

export default function ReservationCreateCalendarPage() {
    const dispatch = useAppDispatch()

    const { loginUser, isManager, isOffice } = useLogin()
    const canSelectStaff = isManager || isOffice

    const allStaffs = useAppSelector(getStaffs)
    const [selectedStaff, setSelectedStaff] = useState<string>(
        canSelectStaff ? 'all' : loginUser!.id
    )

    const handleStaffChange = (staff: string) => {
        setSelectedStaff(staff)
    }

    const handleEditClick = (reservation: Reservation) => {
        dispatch(setSelectedReservation(reservation))
        dispatch(pushPage(Page.RESERVE_EDIT))
    }

    const handleDetailClick = (reservation: Reservation) => {
        dispatch(setSelectedReservation(reservation))
        dispatch(pushPage(Page.RESERVE_DETAIL))
    }

    const handleCreateByStaff = (
        date: string,
        hour: number,
        availableStaffs: User[],
        staffId: string
    ) => {
        dispatch(
            setDraft({
                date: date,
                time: hour.toString().padStart(2, '0') + ':00',
                staff: allStaffs.find((staff) => staff.id === staffId)!,
                availableStaffs: availableStaffs,
            })
        )
        dispatch(pushPage(Page.RESERVE_CREATE))
    }

    return (
        <Container fluid className="py-3">
            <h5 className="text-center mb-3">予約作成</h5>
            {canSelectStaff && (
                <StaffSelector
                    selectedStaff={selectedStaff}
                    onStaffChange={handleStaffChange}
                />
            )}
            {selectedStaff === 'all' ? (
                <ReservationCreateCalendarForAllSection
                    onEditClick={handleEditClick}
                    onDetailClick={handleDetailClick}
                    onCreateByStaff={handleCreateByStaff}
                />
            ) : (
                <ReservationCreateCalendarSection
                    selectedStaff={
                        allStaffs.find((staff) => staff.id === selectedStaff)!
                    }
                    onEditClick={handleEditClick}
                    onDetailClick={handleDetailClick}
                    onCreateByStaff={handleCreateByStaff}
                />
            )}
        </Container>
    )
}
