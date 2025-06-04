import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import { useState } from 'react';
import { Button, Table } from 'react-bootstrap';

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

  const [startOfWeek] = useState(dayjs(('2025-06-04')).startOf('week').add(1, 'day'));

  const days = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, 'day'));
  const hours = Array.from({ length: 10 }, (_, i) => i + 9); // 9:00〜18:00

  const getReservation = (date: string, hour: number) => {
    return sampleReservations.find(
      (r) => r.date === date && parseInt(r.time) === hour
    );
  };

  return (
    <div>
      <style>
        {`
        th {
            font-weight: normal;
          }
        .reservation-cell {
          background-color: #f0f0f0;
        }
        table th.saturday,
        table td.saturday {
          color: #007Bcc !important;
          background-color: #e6f0ff !important;
        }

        table th.sunday,
        table td.sunday {
          color: #cc3B30 !important;
          background-color: #ffe6e6 !important;
        }
        `}
      </style>
      <div className="d-flex justify-content-between mb-2">
        <Button variant="outline-primary" size="sm" onClick={() => {}}>
          &lt; 前の1週間
        </Button>
        <Button variant="outline-primary" size="sm" onClick={() => {}}>
          次の1週間 &gt;
        </Button>
      </div>
      <Table bordered hover responsive className="w-100 text-center align-middle small">
        <thead>
          <tr>
            <th rowSpan={2} className="align-middle">日時</th>
            <th colSpan={7}>2026年6月</th>
          </tr>
          <tr>
            { days.map((day, index) => {
              const isSaturday = day.format('d') === '6';
              const isSunday = day.format('d') === '0';
              const className = isSaturday ? 'saturday' : isSunday ? 'sunday' : '';
              return (
                <th key={day.format()} className={className}>{day.format('D')}<br />({day.locale('ja').format('ddd')})</th>
              )
            }) }
          </tr>
        </thead>
        <tbody>
          {hours.map(hour => {
            return (
            <tr key={hour}>
              <td className="fw-bold">{hour}:00</td>
              {days.map((day) => {
                return (
                  <td key={day.format()}>〇</td>
                );
              })}
          </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  );
}