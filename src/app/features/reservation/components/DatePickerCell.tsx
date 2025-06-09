import { Reservation } from "@/app/types/reservation";
import { Shift } from "@/app/types/shift";
import { filterShiftsAtHour } from "@/app/utils/shiftUtils";
import dayjs from "dayjs";

interface DatePickerCellProps {
  day: dayjs.Dayjs;
  hour: number;
  allReservations: Reservation[];
  allShifts: Shift[];
  currentSelection: {
    day: dayjs.Dayjs;
    hour: number;
  }
  reservationId: string;
  onCellClick?: (date: string, hour: number, reservations: Reservation[]) => void;
}

const getShifts = (allShifts: Shift[], day: dayjs.Dayjs, hour: number) => {
  return filterShiftsAtHour(allShifts, day.format('YYYY-MM-DD'), hour);
}

export default function DatePickerCell({ day, hour, allReservations, allShifts, currentSelection, reservationId, onCellClick }: DatePickerCellProps) {

  
  const getReservations = (reservations: Reservation[], day: dayjs.Dayjs, hour: number) => {
    return reservations.filter(reservation => reservation.date === day.format('YYYY-MM-DD') && reservation.time === hour.toString() + ":00" && reservation.id !== reservationId);
  }

  const hasReservations = getReservations(allReservations, day, hour).length > 0;
  const hasShifts = getShifts(allShifts, day, hour).length > 0;

  const handleClick = () => {
    if (onCellClick) {
      onCellClick(day.format('YYYY-MM-DD'), hour, getReservations(allReservations, day, hour));
    }
  }

  const renderContent = (hasReservations: boolean, hasShifts: boolean) => {
    if (currentSelection.day.isSame(day, 'day') && currentSelection.hour === hour) {
      return <div className="align-items-center current-selection">選択中</div>;
    }
    if (!hasShifts) {
      return <div>休</div>;
    }
    if (hasReservations) {
      return <div className="align-items-center">×</div>;
    }
    return <div>空</div>;
  }

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
