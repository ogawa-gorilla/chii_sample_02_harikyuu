import { HOURS } from '@/app/constants/hours';
import { useAppSelector } from '@/app/hooks';
import { isClosedDay as isRegularClosedDay } from '@/app/utils/calendarUtils';
import dayjs from 'dayjs';
import { CalendarCellProps } from './types';

interface CalendarTimeRowProps<TCellProps extends CalendarCellProps = CalendarCellProps> {
  hour: number;
  days: dayjs.Dayjs[];
  isFirstRow: boolean;
  CellComponent?: React.ComponentType<TCellProps>;
  cellProps?: Omit<TCellProps, keyof CalendarCellProps>;
}

const firstRowForClosedDays = (day: dayjs.Dayjs, reason: string) => (
<td key={day.format()} rowSpan={HOURS}>
                  <span className="text-muted" style={{ writingMode: 'vertical-rl', letterSpacing: '0.5em' }}>{reason}</span>
                </td>
)

const DefaultCell = ({ day, hour }: CalendarCellProps) => (
  <td key={`${day.format()}-${hour}`}>
    <div></div>
  </td>
);

export default function CalendarTimeRow<TCellProps extends CalendarCellProps = CalendarCellProps>({ 
  hour, 
  days, 
  isFirstRow, 
  CellComponent, 
  cellProps = {} as Omit<TCellProps, keyof CalendarCellProps>
}: CalendarTimeRowProps<TCellProps>) {
  const CellToRender = CellComponent || DefaultCell;
  const temporalHolidays = useAppSelector((state) => state.shift.temporalHolidays);

  return (
    <tr key={hour}>
            <style>
      </style>
      <td className="fw-bold">{hour}:00</td>
      {days.map((day) => {
        let closed = false
        let closedReason = ''
        if (isRegularClosedDay(day)) {
          closed = true
          closedReason = '定休日'
        }
        if (temporalHolidays.find(holiday => holiday.date === day.format('YYYY-MM-DD'))) {
          closed = true
          closedReason = '臨時休業'
        }
        if (closed) {
            if (isFirstRow) {
              return firstRowForClosedDays(day, closedReason);
            } else {
              return null
            }
          }
        return (
          <CellToRender 
            key={`${day.format()}-${hour}`}
            {...({
              day, 
              hour, 
              ...cellProps
            } as TCellProps)}
          />
        );
      })}
    </tr>
  );
} 