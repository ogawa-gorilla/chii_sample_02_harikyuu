import Calendar from "@/app/components/calendar/Calendar";
import { useAppSelector } from "@/app/hooks";
import { Reservation } from "@/app/types/reservation";
import { useState } from "react";
import { Container } from "react-bootstrap";
import ReservationCell from "./ReservationCell";
import ReservationModal from "./ReservationModal";

export default function ReservationCalendarPage() {

  const allReservations = useAppSelector((state) => state.reservation.reservations);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [reservationsShown, setReservationsShown] = useState<Reservation[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedHour, setSelectedHour] = useState<number>(0);

  const handleCellClick = (date: string, hour: number, reservations: Reservation[]) => {
    setShowReservationModal(true);
    setSelectedDate(date);
    setSelectedHour(hour);
    setReservationsShown(reservations);
  }

  return (
    <Container fluid className="py-3">
      <ReservationModal show={showReservationModal} onHide={() => setShowReservationModal(false)} reservations={reservationsShown} selectedDate={selectedDate} selectedHour={selectedHour} />
      <h5 className="text-center mb-3">予約カレンダー</h5>
      <Calendar cellComponent={ReservationCell} cellProps={{ allReservations, onCellClick: handleCellClick }} />
  </Container>
  );
}