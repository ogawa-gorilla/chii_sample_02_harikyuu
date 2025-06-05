import { useAppSelector } from '@/app/hooks';
import { Reservation } from '@/app/types/reservation';
import { useState } from 'react';
import { Table } from 'react-bootstrap';
import { useCalendar } from '../hooks/useCalendar';
import CalendarHeader from './CalendarHeader';
import CalendarNavigation from './CalendarNavigation';
import CalendarStyles from './CalendarStyles';
import CalendarTimeRow from './CalendarTimeRow';
import ReservationModal from './ReservationModal';
import StaffSelector from './StaffSelector';

export default function Calendar() {
  const { 
    startOfWeek, 
    days, 
    hours, 
    handlePrevWeek, 
    handleNextWeek, 
    handleToday 
  } = useCalendar();
  
  const [selectedStaff, setSelectedStaff] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedReservations, setSelectedReservations] = useState<Reservation[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedHour, setSelectedHour] = useState(0);

  const allReservations = useAppSelector((state) => state.reservation.reservations);
  const reservationsOnTheWeek = allReservations.filter((reservation) => 
    reservation.date >= startOfWeek.format('YYYY-MM-DD') &&
    reservation.date <= startOfWeek.add(6, 'day').format('YYYY-MM-DD')
  );
  const filteredReservations = selectedStaff === 'all' ? reservationsOnTheWeek : reservationsOnTheWeek.filter((reservation) => reservation.staff.id === selectedStaff);

  const handleStaffChange = (staff: string) => {
    setSelectedStaff(staff);
  };

  const handleCellClick = (date: string, hour: number, reservations: Reservation[]) => {
    setSelectedDate(date);
    setSelectedHour(hour);
    setSelectedReservations(reservations);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedReservations([]);
    setSelectedDate('');
    setSelectedHour(0);
  };

  return (
    <div>
      <CalendarStyles />
      <style jsx>{`
        .clickable-cell {
          transition: background-color 0.2s ease;
        }
        .clickable-cell:hover {
          background-color: #f8f9fa !important;
        }
      `}</style>
      
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
              onCellClick={handleCellClick}
            />
          ))}
        </tbody>
      </Table>

      <ReservationModal
        show={showModal}
        onHide={handleCloseModal}
        reservations={selectedReservations}
        selectedDate={selectedDate}
        selectedHour={selectedHour}
      />
    </div>
  );
}