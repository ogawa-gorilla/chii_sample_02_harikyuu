import { HOURS } from '@/app/constants/hours';
import { Reservation } from '@/app/types/reservation';
import dayjs from 'dayjs';
import { isClosedDay } from '../../../utils/calendarUtils';
import ReservationTimeSlot from './ReservationTimeSlot';

interface ReservationTimeRowProps {
  hour: number;
  days: dayjs.Dayjs[];
  isFirstRow: boolean;
  reservations: Reservation[];
  selectedStaff: string;
  onTimeSlotSelect: (date: string, hour: number, staffId: string) => void;
}

const firstRowForClosedDays = (day: dayjs.Dayjs) => (
  <td key={day.format()} rowSpan={HOURS}>
    <span className="text-muted">定<br />休<br />日</span>
  </td>
);

export default function ReservationTimeRow({ 
  hour, 
  days, 
  isFirstRow, 
  reservations, 
  selectedStaff,
  onTimeSlotSelect 
}: ReservationTimeRowProps) {
  return (
    <tr key={hour}>
      <td className="fw-bold">{hour}:00</td>
      {days.map((day) => {
        if (isClosedDay(day)) {
          if (isFirstRow) {
            return firstRowForClosedDays(day);
          } else {
            return null;
          }
        }
        return (
          <ReservationTimeSlot
            key={day.format()}
            day={day}
            hour={hour}
            reservations={reservations}
            selectedStaff={selectedStaff}
            onTimeSlotSelect={onTimeSlotSelect}
          />
        );
      })}
    </tr>
  );
} 