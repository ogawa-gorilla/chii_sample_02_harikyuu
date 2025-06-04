import { HOURS } from '@/app/constants/hours';
import { VIRUTAL_TODAY } from '@/app/constants/virtualToday';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import { useState } from 'react';
import { Table } from 'react-bootstrap';
import CalendarHeader from './CalendarHeader';
import CalendarNavigation from './CalendarNavigation';
import CalendarStyles from './CalendarStyles';
import CalendarTimeRow from './CalendarTimeRow';

const sampleReservations = [
  {
    id: 1,
    staff: '山田',
    client: '田中 太郎',
    date: '2025-06-03',
    time: '10:00',
    duration: 1, // 時間単位
    status: '予約済'
  },
  {
    id: 2,
    staff: '鈴木',
    client: '佐藤 花子',
    date: '2025-06-05',
    time: '13:00',
    duration: 2,
    status: '施術完了'
  }
];

export default function Calendar() {
  const [startOfWeek, setStartOfWeek] = useState(dayjs(VIRUTAL_TODAY).startOf('week').add(1, 'day'));

  const days = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, 'day'));
  const hours = Array.from({ length: HOURS }, (_, i) => i + 9); // 9:00〜18:00

  const getReservation = (date: string, hour: number) => {
    return sampleReservations.find(
      (r) => r.date === date && parseInt(r.time) === hour
    );
  };

  const handlePrevWeek = () => {
    setStartOfWeek(prev => prev.subtract(1, 'week'));
  };

  const handleNextWeek = () => {
    setStartOfWeek(prev => prev.add(1, 'week'));
  };

  const handleToday = () => {
    setStartOfWeek(dayjs(VIRUTAL_TODAY).startOf('week').add(1, 'day'));
  };

  return (
    <div>
      <CalendarStyles />
      
      <CalendarNavigation 
        onPrevWeek={handlePrevWeek}
        onNextWeek={handleNextWeek}
        onToday={handleToday}
      />
      
      <Table bordered responsive className="w-100 text-center align-middle small">
        <CalendarHeader days={days} />
        <tbody>
          {hours.map((hour, index) => (
            <CalendarTimeRow
              key={hour}
              hour={hour}
              days={days}
              getReservation={getReservation}
              isFirstRow={index === 0}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
}