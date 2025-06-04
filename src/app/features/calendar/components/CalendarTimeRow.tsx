import { HOURS } from '@/app/constants/hours';
import { weeklyClosedDays } from '@/app/constants/weeklyClosedDays';
import dayjs from 'dayjs';
import CalendarCell from './CalendarCell';

interface CalendarTimeRowProps {
  hour: number;
  days: dayjs.Dayjs[];
  isFirstRow: boolean;
  getReservation: (date: string, hour: number) => any;
}

const firstRowForClosedDays = (day: dayjs.Dayjs) => (
<td key={day.format()} rowSpan={HOURS}>
                  <span className="text-muted" >定<br />休<br />日</span>
                </td>
)

export default function CalendarTimeRow({ hour, days, isFirstRow }: CalendarTimeRowProps) {
  return (
    <tr key={hour}>
            <style>
      </style>
      <td className="fw-bold">{hour}:00</td>
      {days.map((day) => {
        if (weeklyClosedDays.includes(day.format('d'))) {
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
          />
        );
      })}
    </tr>
  );
} 