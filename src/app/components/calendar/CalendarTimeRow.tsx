import { HOURS } from '@/app/constants/hours';
import { isClosedDay } from '@/app/utils/calendarUtils';
import dayjs from 'dayjs';

interface CalendarTimeRowProps {
  hour: number;
  days: dayjs.Dayjs[];
  isFirstRow: boolean;
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
        if (isClosedDay(day)) {
            if (isFirstRow) {
              return firstRowForClosedDays(day);
            } else {
              return null
            }
          }
        return (
          <div></div>
        );
      })}
    </tr>
  );
} 