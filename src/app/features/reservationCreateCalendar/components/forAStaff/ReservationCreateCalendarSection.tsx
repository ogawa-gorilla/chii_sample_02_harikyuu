import Calendar from '@/app/components/calendar'
import ExplanationCard from '@/app/components/common/ExplanationCard'
import { useAppSelector } from '@/app/hooks'
import { Reservation } from '@/app/types/reservation'
import { User } from '@/app/types/user'
import { filterShiftsAtHour } from '@/app/utils/shiftUtils'
import { useState } from 'react'
import ReservationCreateCalendarCell from './ReservationCreateCalendarCell'
import ReservationCreationModal from './ReservationCreationModal'

interface ReservationCreateCalendarSectionProps {
    selectedStaff: User
    onEditClick: (reservation: Reservation) => void
    onDetailClick: (reservation: Reservation) => void
    onCreateByStaff: (
        date: string,
        hour: number,
        availableStaffs: User[],
        staffId: string
    ) => void
}

export default function ReservationCreateCalendarSection({
    selectedStaff,
    onEditClick,
    onDetailClick,
    onCreateByStaff,
}: ReservationCreateCalendarSectionProps) {
    const allReservations = useAppSelector(
        (state) => state.reservation.reservations
    ).filter((reservation) => reservation.staff.id === selectedStaff.id)
    const allShifts = useAppSelector((state) => state.shift.shifts).filter(
        (shift) => shift.staffId === selectedStaff.id
    )

    const [showReservationCreationModal, setShowReservationCreationModal] =
        useState(false)
    const [date, setDate] = useState('')
    const [hour, setHour] = useState(0)
    const [reservations, setReservations] = useState<Reservation[]>([])

    const handleCellClick = (
        date: string,
        hour: number,
        reservations: Reservation[]
    ) => {
        if (filterShiftsAtHour(allShifts, date, hour).length === 0) {
            return
        }
        setShowReservationCreationModal(true)
        setDate(date)
        setHour(hour)
        setReservations(reservations)
    }

    const handleEditClick = (reservation: Reservation) => {
        onEditClick(reservation)
    }

    const handleDetailClick = (reservation: Reservation) => {
        onDetailClick(reservation)
    }

    const handleStaffSelect = (staffId: string) => {
        onCreateByStaff(date, hour, [selectedStaff], staffId)
        setShowReservationCreationModal(false)
    }

    return (
        <div>
            <ExplanationCard
                title="予約作成画面(個人)"
                text={
                    selectedStaff.name +
                    'さんの空き状況が表示されています。\nコマをクリックすることで、その時間に予約を作成することができます。\nシフト設定されていない日には予約を作成できません。'
                }
            />
            <ReservationCreationModal
                show={showReservationCreationModal}
                onHide={() => setShowReservationCreationModal(false)}
                date={date}
                hour={hour}
                staff={selectedStaff}
                reservations={reservations}
                onEditClick={handleEditClick}
                onDetailClick={handleDetailClick}
                onStaffSelect={handleStaffSelect}
            />
            <Calendar
                cellComponent={ReservationCreateCalendarCell}
                cellProps={{
                    allReservations,
                    allShifts,
                    onCellClick: handleCellClick,
                }}
            />
        </div>
    )
}
