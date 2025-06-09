import Calendar from "@/app/components/calendar";
import { useAppSelector } from "@/app/hooks";
import { Reservation } from "@/app/types/reservation";
import ReservationCreateCalendarCellForAll from "./ReservationCreateCalendarCellForAll";

export default function ReservationCreateCalendarForAllSection() {

  const allReservations = useAppSelector((state) => state.reservation.reservations)
  const allShifts = useAppSelector((state) => state.shift.shifts)

  const handleCellClick = (date: string, hour: number, reservations: Reservation[]) => {
    console.log(date, hour, reservations);
  }

  return (
    <Calendar cellComponent={ReservationCreateCalendarCellForAll} cellProps={{ allReservations, allShifts, onCellClick: handleCellClick }} />
  )
}