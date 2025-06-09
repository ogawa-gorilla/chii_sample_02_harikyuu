import { Reservation } from '@/app/types/reservation';
import { isToday } from '@/app/utils/calendarUtils';
import { filterReservedAt } from '@/app/utils/reservationUtils';
import dayjs from 'dayjs';

interface CalendarCellProps {
  day: dayjs.Dayjs;
  hour: number;
  allReservations: Reservation[];
  onCellClick?: (date: string, hour: number, reservations: Reservation[]) => void;
}

const getClassName = (day: dayjs.Dayjs, hour: number, hasReservations: boolean) => {
  let className = isToday(day) ? 'today' : '';
  
  if (hasReservations) {
    className += ' clickable-cell';
  }
  
  return className;
}

const getReservations = (reservations: Reservation[], day: dayjs.Dayjs, hour: number) => {
  return filterReservedAt(reservations, day.format('YYYY-MM-DD'), hour);
}

const renderReservations = (reservations: Reservation[]) => {
  return reservations.map((reservation) => (
    <div key={reservation.id} className="my-2">
      <span style={{ backgroundColor: reservation.staff.themeColor, color: 'white', borderRadius: '30%', padding: '8px 4px' }}>{reservation.staff.name[0]}</span>
    </div>
  ));
}

export default function CalendarCell({ day, hour, allReservations, onCellClick }: CalendarCellProps) {

  const reservations = getReservations(allReservations, day, hour);
  const hasReservations = reservations.length > 0;

  const handleClick = () => {
    if (hasReservations && onCellClick) {
      onCellClick(day.format('YYYY-MM-DD'), hour, reservations);
    }
  };

  return (
    <td 
      key={`${day.format()}-${hour}`} 
      className={getClassName(day, hour, hasReservations)}
      onClick={handleClick}
      style={{ cursor: hasReservations ? 'pointer' : 'default' }}
    >
      {hasReservations ? (
        <div className="align-items-center">
          {renderReservations(reservations)}
        </div>
      ) : null}
    </td>
  );
} 