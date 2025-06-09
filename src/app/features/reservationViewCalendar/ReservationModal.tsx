import ReservationSimpleView from '@/app/components/common/ReservationSimpleView';
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
  onEditClick: (reservation: Reservation) => void;
  onDetailClick: (reservation: Reservation) => void;
}

export default function ReservationModal({ 
  show, 
  onHide, 
  reservations, 
  selectedDate, 
  selectedHour,
  onEditClick,
  onDetailClick
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
              <ReservationSimpleView key={reservation.id} reservation={reservation} onDetailClick={() => onDetailClick(reservation)} onEditClick={() => onEditClick(reservation)} />
            ))}
          </div>
        ) : (
          <p className="text-muted">この時間帯に予約はありません。</p>
        )}
      </Modal.Body>
    </Modal>
  );
} 