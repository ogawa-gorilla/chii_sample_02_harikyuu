import { Reservation } from "@/app/types/reservation";
import { Shift } from "@/app/types/shift";
import dayjs from "dayjs";

interface ReservationCreateCalendarCellForAllProps {
  day: dayjs.Dayjs;
  hour: number;
  allReservations: Reservation[];
  allShifts: Shift[];
  onCellClick?: (date: string, hour: number, reservations: Reservation[]) => void;
}

const getAvailableStaffs = (reservations: Reservation[], shifts: Shift[], day: dayjs.Dayjs, hour: number) => {
  const reservationsAtHour = reservations.filter(reservation => reservation.date === day.format('YYYY-MM-DD') && reservation.time === hour.toString() + ":00");
  const shiftsAtHour = shifts.filter(shift => shift.date === day.format('YYYY-MM-DD') && shift.startTime <= hour.toString().padStart(2, '0') + ":00" && shift.endTime >= hour.toString().padStart(2, '0') + ":00");
  return shiftsAtHour.length - reservationsAtHour.length;
}

export default function ReservationCreateCalendarCellForAll({ day, hour, allReservations, allShifts, onCellClick }: ReservationCreateCalendarCellForAllProps) {

  
  const availableStaffs = getAvailableStaffs(allReservations, allShifts, day, hour);

  const handleClick = () => {}

  return (
    <td 
      key={`${day.format()}-${hour}`} 
      onClick={handleClick}
    >
      {availableStaffs === 0 ? (
        <div className="align-items-center">
          ×
        </div>
      ) : 
      <div>{availableStaffs}</div>}
    </td>
  );
}