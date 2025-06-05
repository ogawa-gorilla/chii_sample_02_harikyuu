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
              <div key={reservation.id} className="border-bottom pb-3 mb-3">
                <div className="d-flex align-items-center mb-2">
                  <span 
                    style={{ 
                      backgroundColor: reservation.staff.themeColor, 
                      color: 'white', 
                      borderRadius: '50%', 
                      width: '40px', 
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '12px',
                      fontWeight: 'bold'
                    }}
                  >
                    {reservation.staff.name[0]}
                  </span>
                  <div>
                    <div className="fw-bold">{reservation.staff.name}</div>
                    <div className="text-muted small">スタッフ</div>
                  </div>
                </div>
                <div className="ms-5">
                  <div><strong>お客様:</strong> {reservation.client}</div>
                  <div><strong>時間:</strong> {reservation.time} ({reservation.duration}時間)</div>
                  <div><strong>ステータス:</strong> {reservation.status}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted">この時間帯に予約はありません。</p>
        )}
      </Modal.Body>
    </Modal>
  );
} 