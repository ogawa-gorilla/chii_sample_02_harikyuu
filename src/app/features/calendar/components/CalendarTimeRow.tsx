import { HOURS } from '@/app/constants/hours';
import { Reservation } from '@/app/types/reservation';
import dayjs from 'dayjs';
import { isClosedDay } from '../utils/calendarUtils';
import CalendarCell from './CalendarCell';

interface CalendarTimeRowProps {
  hour: number;
  days: dayjs.Dayjs[];
  isFirstRow: boolean;
  reservations: Reservation[];
  onCellClick?: (date: string, hour: number, reservations: Reservation[]) => void;
}

const firstRowForClosedDays = (day: dayjs.Dayjs) => (
<td key={day.format()} rowSpan={HOURS}>
                  <span className="text-muted" >定<br />休<br />日</span>
                </td>
)

export default function CalendarTimeRow({ hour, days, isFirstRow, reservations, onCellClick }: CalendarTimeRowProps) {
  return (
    <tr key={hour}>
            <style>
      </style>
      <td className="fw-bold">{hour}:00</td>
      {days.map((day) => {
        if (isClosedDay(day)) {
            if (isFirstRow) {
              return firstRowForClosedDays(day);
            } else {
              return null
            }
          }
        return (
          <CalendarCell
            key={day.format()}
            day={day}
            hour={hour}
            allReservations={reservations}
            onCellClick={onCellClick}
          />
        );
      })}
    </tr>
  );
} 