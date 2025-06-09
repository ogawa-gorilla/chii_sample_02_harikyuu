import Calendar from "@/app/components/calendar";
import { useAppSelector } from "@/app/hooks";
import { Reservation } from "@/app/types/reservation";
import { User } from "@/app/types/user";
import { useState } from "react";
import ReservationCreateCalendarCell from "./ReservationCreateCalendarCell";
import ReservationCreationModal from "./ReservationCreationModal";

interface ReservationCreateCalendarSectionProps {
  selectedStaff: User;
}

export default function ReservationCreateCalendarSection({ selectedStaff }: ReservationCreateCalendarSectionProps) {

  const allReservations = useAppSelector((state) => state.reservation.reservations).filter((reservation) => reservation.staff.id === selectedStaff.id);
  const allShifts = useAppSelector((state) => state.shift.shifts).filter((shift) => shift.staffId === selectedStaff.id);

  const [showReservationCreationModal, setShowReservationCreationModal] = useState(false);
  const [date, setDate] = useState('');
  const [hour, setHour] = useState(0);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const handleCellClick = (date: string, hour: number, reservations: Reservation[]) => {
    setShowReservationCreationModal(true);
    setDate(date);
    setHour(hour);
    setReservations(reservations);
  }

  return (
    <div>
      <ReservationCreationModal show={showReservationCreationModal} onHide={() => setShowReservationCreationModal(false)} date={date} hour={hour} staff={selectedStaff} reservations={reservations} />
    <Calendar cellComponent={ReservationCreateCalendarCell} cellProps={{ allReservations, allShifts, onCellClick: handleCellClick }} />
    </div>
  )
}