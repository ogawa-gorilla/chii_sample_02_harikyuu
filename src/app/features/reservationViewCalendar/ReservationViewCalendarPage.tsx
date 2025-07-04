import Calendar from '@/app/components/calendar/Calendar'
import ExplanationCard from '@/app/components/common/ExplanationCard'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { pushPage } from '@/app/store/navigationSlice'
import { setDraft, setSelectedReservation } from '@/app/store/reservationSlice'
import { getStaffs } from '@/app/store/userSlice'
import { Page } from '@/app/types/Page'
import { Reservation } from '@/app/types/reservation'
import { useState } from 'react'
import { Container } from 'react-bootstrap'
import ReservationCell from './ReservationCell'
import ReservationModal from './ReservationModal'
import StaffSelector from './StaffSelector'

export default function ReservationViewCalendarPage() {
    const dispatch = useAppDispatch()
    const [selectedStaff, setSelectedStaff] = useState<string>('all')

    const allReservations = useAppSelector(
        (state) => state.reservation.reservations
    ).filter(
        (reservation) =>
            selectedStaff === 'all' || reservation.staff.id === selectedStaff
    )
    const allStaffs = useAppSelector(getStaffs)
    const [showReservationModal, setShowReservationModal] = useState(false)
    const [reservationsShown, setReservationsShown] = useState<Reservation[]>(
        []
    )
    const [selectedDate, setSelectedDate] = useState<string>('')
    const [selectedHour, setSelectedHour] = useState<number>(0)

    const handleCellClick = (
        date: string,
        hour: number,
        reservations: Reservation[]
    ) => {
        setShowReservationModal(true)
        setSelectedDate(date)
        setSelectedHour(hour)
        setReservationsShown(reservations)
    }

    const handleStaffChange = (staff: string) => {
        setSelectedStaff(staff)
    }

    const handleEditClick = (reservation: Reservation) => {
        dispatch(setSelectedReservation(reservation))
        dispatch(
            setDraft({
                date: reservation.date,
                time: reservation.time,
                staff: reservation.staff,
                availableStaffs: allStaffs,
            })
        )
        dispatch(pushPage(Page.RESERVE_EDIT))
    }

    const handleDetailClick = (reservation: Reservation) => {
        dispatch(setSelectedReservation(reservation))
        dispatch(pushPage(Page.RESERVE_DETAIL))
    }

    return (
        <Container fluid className="py-3">
            <ExplanationCard
                title="予約カレンダー"
                text={
                    '予約の一覧カレンダーです。現在ある予約をすべて見ることができます。'
                }
            />
            <ReservationModal
                show={showReservationModal}
                onHide={() => setShowReservationModal(false)}
                reservations={reservationsShown}
                selectedDate={selectedDate}
                selectedHour={selectedHour}
                onEditClick={handleEditClick}
                onDetailClick={handleDetailClick}
            />
            <h5 className="text-center mb-3">予約カレンダー</h5>
            <StaffSelector
                selectedStaff={selectedStaff}
                onStaffChange={handleStaffChange}
                labelForNone="すべて"
            />
            <Calendar
                cellComponent={ReservationCell}
                cellProps={{ allReservations, onCellClick: handleCellClick }}
            />
        </Container>
    )
}
