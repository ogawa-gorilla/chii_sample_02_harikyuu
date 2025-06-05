import { HOURS } from '@/app/constants/hours';
import { VIRUTAL_TODAY } from '@/app/constants/virtualToday';
import { useAppSelector } from '@/app/hooks';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import { useState } from 'react';
import { Table } from 'react-bootstrap';
import CalendarHeader from './CalendarHeader';
import CalendarNavigation from './CalendarNavigation';
import CalendarStyles from './CalendarStyles';
import CalendarTimeRow from './CalendarTimeRow';
import StaffSelector from './StaffSelector';

export default function Calendar() {
  const [startOfWeek, setStartOfWeek] = useState(dayjs(VIRUTAL_TODAY).startOf('week').add(1, 'day'));
  const [selectedStaff, setSelectedStaff] = useState('all');

  const days = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, 'day'));
  const hours = Array.from({ length: HOURS }, (_, i) => i + 9); // 9:00〜18:00

  const allReservations = useAppSelector((state) => state.reservation.reservations);
  const reservationsOnTheWeek = allReservations.filter((reservation) => 
    reservation.date >= startOfWeek.format('YYYY-MM-DD') &&
    reservation.date <= startOfWeek.add(6, 'day').format('YYYY-MM-DD')
  );
  const filteredReservations = selectedStaff === 'all' ? reservationsOnTheWeek : reservationsOnTheWeek.filter((reservation) => reservation.staff.id === selectedStaff);

  const handlePrevWeek = () => {
    setStartOfWeek(prev => prev.subtract(1, 'week'));
  };

  const handleNextWeek = () => {
    setStartOfWeek(prev => prev.add(1, 'week'));
  };

  const handleToday = () => {
    setStartOfWeek(dayjs(VIRUTAL_TODAY).startOf('week').add(1, 'day'));
  };

  const handleStaffChange = (staff: string) => {
    setSelectedStaff(staff);
  };

  return (
    <div>
      <CalendarStyles />
      
      <CalendarNavigation 
        onPrevWeek={handlePrevWeek}
        onNextWeek={handleNextWeek}
        onToday={handleToday}
      />
      
      <StaffSelector 
        selectedStaff={selectedStaff}
        onStaffChange={handleStaffChange}
      />
      
      <Table bordered responsive className="w-100 text-center align-middle small">
        <CalendarHeader days={days} />
        <tbody>
          {hours.map((hour, index) => (
            <CalendarTimeRow
              key={hour}
              hour={hour}
              days={days}
              reservations={filteredReservations}
              isFirstRow={index === 0}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
}