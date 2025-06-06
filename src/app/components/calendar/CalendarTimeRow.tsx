import { HOURS } from '@/app/constants/hours';
import { isClosedDay } from '@/app/utils/calendarUtils';
import dayjs from 'dayjs';
import { CalendarCellProps } from './types';

interface CalendarTimeRowProps {
  hour: number;
  days: dayjs.Dayjs[];
  isFirstRow: boolean;
  CellComponent?: React.ComponentType<CalendarCellProps>;
  cellProps?: Record<string, any>;
}

const firstRowForClosedDays = (day: dayjs.Dayjs) => (
<td key={day.format()} rowSpan={HOURS}>
                  <span className="text-muted" >定<br />休<br />日</span>
                </td>
)

const DefaultCell = ({ day, hour }: CalendarCellProps) => (
  <td key={`${day.format()}-${hour}`}>
    <div></div>
  </td>
);

export default function CalendarTimeRow({ hour, days, isFirstRow, CellComponent, cellProps = {} }: CalendarTimeRowProps) {
  const CellToRender = CellComponent || DefaultCell;

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
          <CellToRender 
            key={`${day.format()}-${hour}`}
            day={day} 
            hour={hour} 
            {...cellProps}
          />
        );
      })}
    </tr>
  );
} 