import { Reservation } from "@/app/types/reservation";
import dayjs from "dayjs";

interface ReservationCreateCalendarCellForAllProps {
  day: dayjs.Dayjs;
  hour: number;
  allReservations: Reservation[];
  onCellClick?: (date: string, hour: number, reservations: Reservation[]) => void;
}

const getAvailableStaffs = (reservations: Reservation[], day: dayjs.Dayjs, hour: number) => {
  const reservationsAtHour = reservations.filter(reservation => reservation.date === day.format('YYYY-MM-DD') && reservation.time === hour.toString() + ":00");
  // 仮実装、いずれはスタッフの稼働状況を見ないといけない
  return 3 - reservationsAtHour.length;
}

export default function ReservationCreateCalendarCellForAll({ day, hour, allReservations, onCellClick }: ReservationCreateCalendarCellForAllProps) {

  
  const availableStaffs = getAvailableStaffs(allReservations, day, hour);

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