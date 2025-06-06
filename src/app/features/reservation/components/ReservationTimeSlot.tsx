import { Reservation } from '@/app/types/reservation';
import dayjs from 'dayjs';
import { getDayClassName } from '../../../utils/calendarUtils';

interface ReservationTimeSlotProps {
  day: dayjs.Dayjs;
  hour: number;
  reservations: Reservation[];
  selectedStaff: string;
  onTimeSlotSelect: (date: string, hour: number, staffId: string) => void;
}

const getReservationsForSlot = (
  reservations: Reservation[], 
  day: dayjs.Dayjs, 
  hour: number, 
  staffId?: string
) => {
  return reservations.filter(reservation => {
    const matchesDateTime = reservation.date === day.format('YYYY-MM-DD') && 
                           reservation.time === hour.toString() + ":00";
    const matchesStaff = !staffId || reservation.staff.id === staffId;
    return matchesDateTime && matchesStaff;
  });
};

const getSlotClassName = (
  day: dayjs.Dayjs, 
  isAvailable: boolean, 
  hasConflict: boolean
) => {
  let className = getDayClassName(day);
  
  if (hasConflict) {
    className += ' unavailable-slot';
  } else if (isAvailable) {
    className += ' available-slot';
  }
  
  return className;
};

export default function ReservationTimeSlot({ 
  day, 
  hour, 
  reservations, 
  selectedStaff,
  onTimeSlotSelect 
}: ReservationTimeSlotProps) {
  // 選択されたスタッフでの予約を確認
  const staffReservations = getReservationsForSlot(reservations, day, hour, selectedStaff);
  const hasConflict = staffReservations.length > 0;
  
  // スタッフが選択されており、競合がない場合は予約可能
  const isAvailable = Boolean(selectedStaff) && !hasConflict;
  
  const handleClick = () => {
    if (isAvailable) {
      onTimeSlotSelect(day.format('YYYY-MM-DD'), hour, selectedStaff);
    }
  };

  return (
    <td 
      key={`${day.format()}-${hour}`} 
      className={getSlotClassName(day, isAvailable, hasConflict)}
      onClick={handleClick}
      style={{ 
        cursor: isAvailable ? 'pointer' : hasConflict ? 'not-allowed' : 'default',
        minHeight: '40px'
      }}
    >
      {hasConflict ? (
        <div className="text-center bg-danger">
          <small className="text-muted">×</small>
        </div>
      ) : isAvailable ? (
        <div className="text-center">
          <small className="text-success">空</small>
        </div>
      ) : (
        <div className="text-center">
          <small className="text-muted">
            {selectedStaff ? '－' : 'スタッフを選択'}
          </small>
        </div>
      )}
    </td>
  );
} 