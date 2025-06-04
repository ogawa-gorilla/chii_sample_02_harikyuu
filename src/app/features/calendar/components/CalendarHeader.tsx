import dayjs from 'dayjs';
import 'dayjs/locale/ja';

interface CalendarHeaderProps {
  days: dayjs.Dayjs[];
}

const renderMonthCell = (days: dayjs.Dayjs[]) => {
  const month = days[0].format('M');
  return (
    <tr>
        <th rowSpan={2} className="align-middle">日時</th>
        <th colSpan={7}>2026年{month}月</th>
    </tr>
  );
}

const renderDay = (day: dayjs.Dayjs) => {
  const isSaturday = day.format('d') === '6';
  const isSunday = day.format('d') === '0';
  const className = isSaturday ? 'saturday' : isSunday ? 'sunday' : '';
  return (
    <th key={day.format()} className={className}>
      {day.format('D')}<br />({day.locale('ja').format('ddd')})
    </th>
  );
}

export default function CalendarHeader({ days }: CalendarHeaderProps) {;

  return (
    <thead>
      {renderMonthCell(days)}
      <tr>
        {days.map((day) => {
          return renderDay(day);
        })}
      </tr>
    </thead>
  );
} 