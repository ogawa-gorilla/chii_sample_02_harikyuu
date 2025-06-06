import dayjs from 'dayjs';

export interface CalendarCellProps {
  day: dayjs.Dayjs;
  hour: number;
}

export interface CalendarProps {
  cellComponent?: React.ComponentType<CalendarCellProps>;
  cellProps?: Record<string, any>;
} 