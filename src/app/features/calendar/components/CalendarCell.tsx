import dayjs from 'dayjs';

interface CalendarCellProps {
  day: dayjs.Dayjs;
  hour: number;
  reservation?: any;
}

export default function CalendarCell({ day, hour }: CalendarCellProps) {
  const isSaturday = day.format('d') === '6';
  const isSunday = day.format('d') === '0';
  const className = isSaturday ? 'saturday' : isSunday ? 'sunday' : '';

  return (
    <td key={`${day.format()}-${hour}`} className={className}>

    </td>
  );
} 