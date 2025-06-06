import { useAppSelector } from '@/app/hooks';
import { useState } from 'react';
import { Table } from 'react-bootstrap';
import { useCalendar } from '../../../hooks/useCalendar';

export default function ReservationCreateCalendarPage() {
  const { 
    startOfWeek, 
    days, 
    hours, 
    handlePrevWeek, 
    handleNextWeek, 
    handleToday 
  } = useCalendar();

  const allReservations = useAppSelector((state) => state.reservation.reservations);
  const reservationsOnTheWeek = allReservations.filter((reservation) => 
    reservation.date >= startOfWeek.format('YYYY-MM-DD') &&
    reservation.date <= startOfWeek.add(6, 'day').format('YYYY-MM-DD')
  );
  const [selectedStaff, setSelectedStaff] = useState('none');
  const onStaffChange = (staff: string) => {
    setSelectedStaff(staff);
  };
  const onTimeSlotSelect = (date: string, hour: number, staffId: string) => {
    console.log(date, hour, staffId);
  };

  return (
    <div>
      
      {(selectedStaff === 'none') ?
      <div>
        <p>スタッフを選択してください</p>
      </div>
      :
        <Table bordered responsive className="w-100 text-center align-middle small">
          <CalendarHeader days={days} />
          <tbody>
            {hours.map((hour, index) => (
              <ReservationTimeRow
                key={hour}
                hour={hour}
                days={days}
                reservations={reservationsOnTheWeek}
                selectedStaff={selectedStaff}
                isFirstRow={index === 0}
                onTimeSlotSelect={onTimeSlotSelect}
              />
            ))}
          </tbody>
        </Table>
}
    </div>
  );
} 