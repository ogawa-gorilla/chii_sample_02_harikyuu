import { Reservation } from "@/app/types/reservation";
import { Shift } from "@/app/types/shift";
import { filterShiftsAtHour } from "@/app/utils/shiftUtils";
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

const getShifts = (allShifts: Shift[], day: dayjs.Dayjs, hour: number) => {
  return filterShiftsAtHour(allShifts, day.format('YYYY-MM-DD'), hour);
}

const renderContent = (hasReservations: boolean, hasShifts: boolean) => {
  if (!hasShifts) {
    return <div>休</div>;
  }
  if (hasReservations) {
    return <div className="align-items-center">×</div>;
  }
  return <div>空</div>;
}

export default function ReservationCreateCalendarCell({ day, hour, allReservations, allShifts, onCellClick }: ReservationCreateCalendarCellProps) {

  
  const hasReservations = getReservations(allReservations, day, hour).length > 0;
  const hasShifts = getShifts(allShifts, day, hour).length > 0;

  const handleClick = () => {}

  return (
    <td 
      key={`${day.format()}-${hour}`} 
      onClick={handleClick}
      className={hasShifts && !hasReservations ? '' : 'not-available'}
    >
      {renderContent(hasReservations, hasShifts)}
    </td>
  );
}
