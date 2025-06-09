import ReservationDetail from '@/app/components/common/ReservationDetail';
import { Reservation } from '@/app/types/reservation';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import { Modal } from 'react-bootstrap';

interface ReservationModalProps {
  show: boolean;
  onHide: () => void;
  reservations: Reservation[];
  selectedDate: string;
  selectedHour: number;
}

export default function ReservationModal({ 
  show, 
  onHide, 
  reservations, 
  selectedDate, 
  selectedHour 
}: ReservationModalProps) {
  dayjs.locale('ja');
  
  const formatDate = (date: string) => {
    return dayjs(date).format('YYYY年M月D日(ddd)');
  };

  const formatTime = (hour: number) => {
    return `${hour}:00`;
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {formatDate(selectedDate)} {formatTime(selectedHour)}の予約
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {reservations.length > 0 ? (
          <div>
            {reservations.map((reservation) => (
              <ReservationDetail key={reservation.id} reservation={reservation} />
            ))}
          </div>
        ) : (
          <p className="text-muted">この時間帯に予約はありません。</p>
        )}
      </Modal.Body>
    </Modal>
  );
} 