import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import { getDayClassName } from '../utils/calendarUtils';

interface CalendarHeaderProps {
  days: dayjs.Dayjs[];
}

const renderMonthCell = (days: dayjs.Dayjs[]) => {
  const year = days[0].format('YYYY');
  const month = days[0].format('M');
  const monthOfLastDay = days[days.length - 1].format('M');
  var colsForFirstItem = 7;

  if (month !== monthOfLastDay) {
    colsForFirstItem = days.reduce((acc, day) => {
      if (day.format('M') === month) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }

  const colsForLastItem = 7 - colsForFirstItem;

  return (
    <tr>
        <th rowSpan={2} className="align-middle">日時</th>
        <th colSpan={colsForFirstItem}>{colsForFirstItem > 1 ? year + '年' : ''}{month}月</th>
        {colsForLastItem > 0 ?
        <th colSpan={colsForLastItem}>{colsForLastItem > 1 ? year + '年' : ''}{monthOfLastDay}月</th>
        : null}
    </tr>
  );

  
}

const renderDay = (day: dayjs.Dayjs) => {
  const className = getDayClassName(day);
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