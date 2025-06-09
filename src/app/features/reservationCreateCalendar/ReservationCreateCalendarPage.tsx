import Calendar from "@/app/components/calendar";
import { useAppSelector } from "@/app/hooks";
import { Reservation } from "@/app/types/reservation";
import { useState } from "react";
import { Container } from "react-bootstrap";
import ReservationCreateCalendarCell from "./components/ReservationCreateCalendarCell";
import StaffSelector from "./components/StaffSelector";

export default function ReservationCreateCalendarPage() {

  const [selectedStaff, setSelectedStaff] = useState<string>('none');

  const allReservations = useAppSelector((state) => state.reservation.reservations).filter((reservation) => selectedStaff === 'none' || reservation.staff.id === selectedStaff);

  const handleStaffChange = (staff: string) => {
    setSelectedStaff(staff);
  }

  const handleCellClick = (date: string, hour: number, reservations: Reservation[]) => {
    console.log(date, hour, reservations);
  }
// TODO: 未選択のとき空いてるスタッフ一覧を出せるように
  return (
    <Container fluid className="py-3">

      <h5 className="text-center mb-3">予約作成</h5>
      <StaffSelector selectedStaff={selectedStaff} onStaffChange={handleStaffChange} />
      <Calendar cellComponent={ReservationCreateCalendarCell} cellProps={{ allReservations, onCellClick: handleCellClick }} />
  </Container>
  );
}