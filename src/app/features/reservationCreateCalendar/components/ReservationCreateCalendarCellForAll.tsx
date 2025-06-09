import { Reservation } from "@/app/types/reservation";
import { Shift } from "@/app/types/shift";
import { filterReservedAt } from "@/app/utils/reservationUtils";
import { filterShiftsAtHour } from "@/app/utils/shiftUtils";
import dayjs from "dayjs";

interface ReservationCreateCalendarCellForAllProps {
  day: dayjs.Dayjs;
  hour: number;
  allReservations: Reservation[];
  allShifts: Shift[];
  onCellClick?: (date: string, hour: number) => void;
}

const countAvailableStaffs = (reservationsAtTime: Reservation[], shiftsAtTime: Shift[]): number => {
  if (reservationsAtTime.length === 0) {
    return shiftsAtTime.length;
  }

  let count = shiftsAtTime.length;
  for (const shift of shiftsAtTime) {
    if (reservationsAtTime.find(reservation => reservation.staff.id === shift.staffId)) {
      count--;
    }
  }
  return count;
}

const getAvailableStaffs = (reservations: Reservation[], shifts: Shift[], day: dayjs.Dayjs, hour: number) => {
  const reservationsAtHour = filterReservedAt(reservations, day.format('YYYY-MM-DD'), hour);
  const shiftsAtHour = filterShiftsAtHour(shifts, day.format('YYYY-MM-DD'), hour);
  return countAvailableStaffs(reservationsAtHour, shiftsAtHour);
}

export default function ReservationCreateCalendarCellForAll({ day, hour, allReservations, allShifts, onCellClick }: ReservationCreateCalendarCellForAllProps) {

  
  const availableStaffs = getAvailableStaffs(allReservations, allShifts, day, hour);

  const handleClick = () => {
    if (onCellClick) {
      onCellClick(day.format('YYYY-MM-DD'), hour);
    }
  }

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