import { Reservation } from "@/app/types/reservation";
import { Shift } from "@/app/types/shift";
import dayjs from "dayjs";

interface ReservationCreateCalendarCellProps {
  day: dayjs.Dayjs;
  hour: number;
  allReservations: Reservation[];
  allShifts: Shift[];
  onCellClick?: (date: string, hour: number, reservations: Reservation[]) => void;
}

const getReservations = (reservations: Reservation[], day: dayjs.Dayjs, hour: number) => {
  return reservations.filter(reservation => reservation.date === day.format('YYYY-MM-DD') && reservation.time === hour.toString() + ":00");
}

export default function ReservationCreateCalendarCell({ day, hour, allReservations, allShifts, onCellClick }: ReservationCreateCalendarCellProps) {

  
  const hasReservations = getReservations(allReservations, day, hour).length > 0;

  const handleClick = () => {}

  return (
    <td 
      key={`${day.format()}-${hour}`} 
      onClick={handleClick}
    >
      {hasReservations ? (
        <div className="align-items-center">
          ×
        </div>
      ) : 
      <div>空</div>}
    </td>
  );
}