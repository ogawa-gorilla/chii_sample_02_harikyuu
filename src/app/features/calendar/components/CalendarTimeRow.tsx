import dayjs from 'dayjs';
import CalendarCell from './CalendarCell';

interface CalendarTimeRowProps {
  hour: number;
  days: dayjs.Dayjs[];
  getReservation: (date: string, hour: number) => any;
}

export default function CalendarTimeRow({ hour, days, getReservation }: CalendarTimeRowProps) {
  return (
    <tr key={hour}>
      <td className="fw-bold">{hour}:00</td>
      {days.map((day) => {
        const reservation = getReservation(day.format('YYYY-MM-DD'), hour);
        return (
          <CalendarCell
            key={day.format()}
            day={day}
            hour={hour}
            reservation={reservation}
          />
        );
      })}
    </tr>
  );
} 