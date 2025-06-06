import { useAppSelector } from '@/app/hooks';
import { useState } from 'react';
import { Table } from 'react-bootstrap';
import CalendarStyles from '../../../components/calendar/CalendarStyles';
import { useCalendar } from '../../../hooks/useCalendar';
import CalendarHeader from '../../calendar/components/CalendarHeader';
import CalendarNavigation from '../../calendar/components/CalendarNavigation';
import StaffSelectorForReservation from '../../calendar/components/StaffSelectorForReservation';
import ReservationTimeRow from './ReservationTimeRow';

export default function ReservationCalendar() {
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
      <CalendarStyles />
      <style jsx>{`
        .available-slot {
          background-color: #e8f5e8 !important;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        .available-slot:hover {
          background-color: #d4edda !important;
        }
        .unavailable-slot {
          background-color: #f8d7da !important;
          cursor: not-allowed;
        }
      `}</style>
      
      <CalendarNavigation 
        onPrevWeek={handlePrevWeek}
        onNextWeek={handleNextWeek}
        onToday={handleToday}
      />
      
      <StaffSelectorForReservation 
        selectedStaff={selectedStaff}
        onStaffChange={onStaffChange}
      />
      
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