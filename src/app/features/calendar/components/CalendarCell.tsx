import { VIRUTAL_TODAY } from '@/app/constants/virtualToday';
import { Reservation } from '@/app/types/reservation';
import dayjs from 'dayjs';

interface CalendarCellProps {
  day: dayjs.Dayjs;
  hour: number;
  allReservations: Reservation[];
}

const getClassName = (day: dayjs.Dayjs, hour: number) => {
  const isToday = day.format('YYYY-MM-DD') === VIRUTAL_TODAY;
  const className = isToday ? 'today' : '';
  return className;
}

const getReservations = (reservations: Reservation[], day: dayjs.Dayjs, hour: number) => {
  return reservations.filter(reservation => reservation.date === day.format('YYYY-MM-DD') && reservation.time === hour.toString() + ":00");
}

const renderReservations = (reservations: Reservation[]) => {
  return reservations.map((reservation) => (
    <div key={reservation.id} className="my-2">
      <span style={{ backgroundColor: reservation.staff.themeColor, color: 'white', borderRadius: '30%', padding: '8px 4px' }}>{reservation.staff.name[0]}</span>
    </div>
  ));
}

export default function CalendarCell({ day, hour, allReservations }: CalendarCellProps) {

  const reservations = getReservations(allReservations, day, hour);

  return (
    <td key={`${day.format()}-${hour}`} className={getClassName(day, hour)}>
      {(reservations.length > 0) ? (
        <div className="align-items-center">
          {renderReservations(reservations)}
        </div>
      ) : null}
    </td>
  );
} 