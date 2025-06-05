import { VIRUTAL_TODAY } from '@/app/constants/virtualToday';
import { Reservation } from '@/app/types/reservation';
import dayjs from 'dayjs';

interface CalendarCellProps {
  day: dayjs.Dayjs;
  hour: number;
  reservations: Reservation[];
}

const getClassName = (day: dayjs.Dayjs, hour: number) => {
  const isToday = day.format('YYYY-MM-DD') === VIRUTAL_TODAY;
  const className = isToday ? 'today' : '';
  return className;
}

const getReservation = (reservations: Reservation[], day: dayjs.Dayjs, hour: number) => {
  return reservations.find(reservation => reservation.date === day.format('YYYY-MM-DD') && reservation.time === hour.toString() + ":00");
}

const renderReservation = (reservation: Reservation) => {
  return (
    <div key={reservation.id}>
      <span style={{ backgroundColor: reservation.staff.themeColor, color: 'white', borderRadius: '30%', padding: '8px 4px' }}>{reservation.staff.name[0]}</span>
    </div>
  );
}

export default function CalendarCell({ day, hour, reservations }: CalendarCellProps) {

  const reservation = getReservation(reservations, day, hour);

  return (
    <td key={`${day.format()}-${hour}`} className={getClassName(day, hour)}>
      {(reservation) ? (
        <div>
          {renderReservation(reservation)}
        </div>
      ) : null}
    </td>
  );
} 