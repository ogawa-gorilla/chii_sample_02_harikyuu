import Calendar from '@/app/components/calendar'
import { useAppSelector } from '@/app/hooks'
import { Reservation } from '@/app/types/reservation'
import { User } from '@/app/types/user'
import { filterReservedAt } from '@/app/utils/reservationUtils'
import { filterShiftsAtHour } from '@/app/utils/shiftUtils'
import dayjs from 'dayjs'
import { Button, Modal } from 'react-bootstrap'
import DatePickerCell from './DatePickerCell'

interface DatePickerModalProps {
    show: boolean
    onHide: () => void
    staff: User
    currentSelection: {
        day: dayjs.Dayjs
        hour: number
    }
    reservationId: string | null
    onDateSelected: (date: string, hour: number) => void
}

export default function DatePickerModal({
    show,
    onHide,
    staff,
    currentSelection,
    reservationId,
    onDateSelected,
}: DatePickerModalProps) {
    const allReservations = useAppSelector(
        (state) => state.reservation.reservations
    ).filter((reservation) => reservation.staff.id === staff.id)
    const allShifts = useAppSelector((state) => state.shift.shifts).filter(
        (shift) => shift.staffId === staff.id
    )

    const handleCellClick = (
        date: string,
        hour: number,
        reservations: Reservation[]
    ) => {
        if (
            filterShiftsAtHour(allShifts, date, hour).length === 0 ||
            filterReservedAt(allReservations, date, hour).filter(
                (r) => r.id !== reservationId
            ).length > 0
        ) {
            return
        }

        onDateSelected(date, hour)
    }

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <style>
                {`
            .current-selection {
              background-color: #007bff;
              color: white;
            }
          `}
            </style>
            <Modal.Header closeButton>
                <Modal.Title>予約日時選択({staff.name})</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-2">
                <Calendar
                    cellComponent={DatePickerCell}
                    cellProps={{
                        allReservations,
                        allShifts,
                        currentSelection: {
                            day: dayjs(currentSelection.day),
                            hour: currentSelection.hour,
                        },
                        reservationId: reservationId ?? '',
                        onCellClick: handleCellClick,
                    }}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    閉じる
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
