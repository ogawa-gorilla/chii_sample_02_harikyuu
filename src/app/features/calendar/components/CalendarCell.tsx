import { VIRUTAL_TODAY } from '@/app/constants/virtualToday';
import dayjs from 'dayjs';

interface CalendarCellProps {
  day: dayjs.Dayjs;
  hour: number;
  reservation?: any;
}

const getClassName = (day: dayjs.Dayjs, hour: number) => {
  const isSaturday = day.format('d') === '6';
  const isSunday = day.format('d') === '0';
  const isToday = day.format('YYYY-MM-DD') === VIRUTAL_TODAY;
  const className = isSaturday ? 'saturday' : isSunday ? 'sunday' : isToday ? 'today' : '';
  return className;
}

export default function CalendarCell({ day, hour }: CalendarCellProps) {
  const isSaturday = day.format('d') === '6';
  const isSunday = day.format('d') === '0';
  const isToday = day.format('YYYY-MM-DD') === VIRUTAL_TODAY;

  return (
    <td key={`${day.format()}-${hour}`} className={getClassName(day, hour)}>

    </td>
  );
} 