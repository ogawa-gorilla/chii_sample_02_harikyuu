import Calendar from "@/app/components/calendar";
import { useAppSelector } from "@/app/hooks";
import { Reservation } from "@/app/types/reservation";
import { useState } from "react";
import { Container } from "react-bootstrap";
import ReservationCreateCalendarCell from "./components/ReservationCreateCalendarCell";
import ReservationCreateCalendarCellForAll from "./components/ReservationCreateCalendarCellForAll";
import StaffSelector from "./components/StaffSelector";

export default function ReservationCreateCalendarPage() {

  const [selectedStaff, setSelectedStaff] = useState<string>('all');

  const allReservations = useAppSelector((state) => state.reservation.reservations).filter((reservation) => selectedStaff === 'all' || reservation.staff.id === selectedStaff);
  const allShifts = useAppSelector((state) => state.shift.shifts).filter((shift) => selectedStaff === 'all' || shift.staffId === selectedStaff);

  const handleStaffChange = (staff: string) => {
    setSelectedStaff(staff);
  }

  const handleCellClick = (date: string, hour: number, reservations: Reservation[]) => {
    console.log(date, hour, reservations);
  }

  return (
    <Container fluid className="py-3">

      <h5 className="text-center mb-3">予約作成</h5>
      <StaffSelector selectedStaff={selectedStaff} onStaffChange={handleStaffChange} />
      {
        selectedStaff === 'all' ? (
          <Calendar cellComponent={ReservationCreateCalendarCellForAll} cellProps={{ allReservations, allShifts, onCellClick: handleCellClick }} />
        ) : (
          <Calendar cellComponent={ReservationCreateCalendarCell} cellProps={{ allReservations, allShifts, onCellClick: handleCellClick }} />
        )
      }
  </Container>
  );
}