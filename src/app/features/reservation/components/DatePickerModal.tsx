import Calendar from "@/app/components/calendar";
import { useAppSelector } from "@/app/hooks";
import { Reservation } from "@/app/types/reservation";
import { User } from "@/app/types/user";
import { filterReservedAt } from "@/app/utils/reservationUtils";
import { filterShiftsAtHour } from "@/app/utils/shiftUtils";
import { Button, Modal } from "react-bootstrap";
import ReservationCreateCalendarCell from "../../reservationCreateCalendar/components/forAStaff/ReservationCreateCalendarCell";

interface DatePickerModalProps {
  show: boolean;
  onHide: () => void;
  staff: User;
  onDateSelected: (date: string, hour: number) => void;
}

export default function DatePickerModal({ show, onHide, staff, onDateSelected }: DatePickerModalProps) {

  const allReservations = useAppSelector((state) => state.reservation.reservations).filter(reservation => reservation.staff.id === staff.id);
  const allShifts = useAppSelector((state) => state.shift.shifts).filter(shift => shift.staffId === staff.id);

  const handleCellClick = (date: string, hour: number, reservations: Reservation[]) => {
    if (filterShiftsAtHour(allShifts, date, hour).length === 0 || filterReservedAt(allReservations, date, hour).length > 0) {
      return;
    }

    onDateSelected(date, hour);
  }

  return (
      <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>予約日時選択({staff.name})</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-2">
          <Calendar cellComponent={ReservationCreateCalendarCell} cellProps={{ allReservations, allShifts, onCellClick: handleCellClick }} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>閉じる</Button>
        </Modal.Footer>
      </Modal>
  );
}
