import { VIRUTAL_TODAY } from '@/app/constants/virtualToday';
import dayjs from 'dayjs';

interface CalendarCellProps {
  day: dayjs.Dayjs;
  hour: number;
  reservation?: any;
}

const getClassName = (day: dayjs.Dayjs, hour: number) => {
  const isToday = day.format('YYYY-MM-DD') === VIRUTAL_TODAY;
  const className = isToday ? 'today' : '';
  return className;
}

export default function CalendarCell({ day, hour }: CalendarCellProps) {
  return (
    <td key={`${day.format()}-${hour}`} className={getClassName(day, hour)}>

    </td>
  );
} 