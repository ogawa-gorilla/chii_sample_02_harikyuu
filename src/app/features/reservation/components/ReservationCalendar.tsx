import { useAppSelector } from '@/app/hooks';
import { Table } from 'react-bootstrap';
import CalendarHeader from '../../calendar/components/CalendarHeader';
import CalendarNavigation from '../../calendar/components/CalendarNavigation';
import CalendarStyles from '../../calendar/components/CalendarStyles';
import StaffSelectorForReservation from '../../calendar/components/StaffSelectorForReservation';
import { useCalendar } from '../../calendar/hooks/useCalendar';
import ReservationTimeRow from './ReservationTimeRow';

interface ReservationCalendarProps {
  selectedStaff: string;
  onStaffChange: (staffId: string) => void;
  onTimeSlotSelect: (date: string, hour: number, staffId: string) => void;
}

export default function ReservationCalendar({ 
  selectedStaff, 
  onStaffChange, 
  onTimeSlotSelect 
}: ReservationCalendarProps) {
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
    </div>
  );
} 