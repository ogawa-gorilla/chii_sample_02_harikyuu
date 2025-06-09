import Calendar from "@/app/components/calendar";
import { useAppSelector } from "@/app/hooks";
import { Reservation } from "@/app/types/reservation";
import ReservationCreateCalendarCell from "./ReservationCreateCalendarCell";

interface ReservationCreateCalendarSectionProps {
  selectedStaff: string;
}

export default function ReservationCreateCalendarSection({ selectedStaff }: ReservationCreateCalendarSectionProps) {

  const allReservations = useAppSelector((state) => state.reservation.reservations).filter((reservation) => reservation.staff.id === selectedStaff);
  const allShifts = useAppSelector((state) => state.shift.shifts).filter((shift) => shift.staffId === selectedStaff);

  const handleCellClick = (date: string, hour: number, reservations: Reservation[]) => {
    console.log(date, hour, reservations);
  }

  return (
    <Calendar cellComponent={ReservationCreateCalendarCell} cellProps={{ allReservations, allShifts, onCellClick: handleCellClick }} />
  )
}