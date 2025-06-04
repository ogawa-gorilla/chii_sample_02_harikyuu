import dayjs from 'dayjs';
import 'dayjs/locale/ja';

interface CalendarHeaderProps {
  days: dayjs.Dayjs[];
}

export default function CalendarHeader({ days }: CalendarHeaderProps) {
  return (
    <thead>
      <tr>
        <th rowSpan={2} className="align-middle">日時</th>
        <th colSpan={7}>2026年6月</th>
      </tr>
      <tr>
        {days.map((day) => {
          const isSaturday = day.format('d') === '6';
          const isSunday = day.format('d') === '0';
          const className = isSaturday ? 'saturday' : isSunday ? 'sunday' : '';
          return (
            <th key={day.format()} className={className}>
              {day.format('D')}<br />({day.locale('ja').format('ddd')})
            </th>
          );
        })}
      </tr>
    </thead>
  );
} 