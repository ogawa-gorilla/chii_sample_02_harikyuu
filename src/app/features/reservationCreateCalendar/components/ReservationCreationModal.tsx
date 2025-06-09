import ReservationDetail from '@/app/components/common/ReservationDetail';
import StaffButton from '@/app/components/common/StaffButton';
import { Reservation } from '@/app/types/reservation';
import { User } from '@/app/types/user';
import dayjs from 'dayjs';
import { Modal } from 'react-bootstrap';

interface AvailableStaffModalProps {
  show: boolean;
  onHide: () => void;
  date: string;
  hour: number;
  staff: User;
  reservations: Reservation[];
  onStaffSelect?: (staffId: string) => void;
  onCreateWithoutStaff?: () => void;
}

export default function ReservationCreationModal({
  show,
  onHide,
  date,
  hour,
  staff,
  reservations,
  onStaffSelect,
}: AvailableStaffModalProps) {
  
  const formatDateTime = () => {
    const dayObj = dayjs(date);
    const dayOfWeek = dayObj.format('dddd');
    const formattedDate = dayObj.format('M月D日');
    const formattedHour = `${hour.toString().padStart(2, '0')}:00`;
    return `${formattedDate}(${dayOfWeek}) ${formattedHour}`;
  };

  const hasExistingReservations = reservations.length > 0;

  return (
    <Modal 
      show={show} 
      onHide={onHide}
      centered
      size="lg"
    >
      <Modal.Header 
        closeButton 
        className={`border-0 pb-0 ${hasExistingReservations ? 'bg-danger-subtle border-danger' : ''}`}
      >
        <Modal.Title className="w-100 text-center fs-5 fw-bold">
          {formatDateTime()}
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body className={`pt-2 ${hasExistingReservations ? 'bg-danger-subtle' : ''}`}>
        {hasExistingReservations && (
          <div className="alert alert-danger d-flex align-items-center mb-3" role="alert">
            <span className="me-2">⚠️</span>
            <div className="fw-bold">
              この時間にはすでに予約があります！
            </div>
          </div>
        )}
        
        <div className="mb-3 text-center">
          
          {/* スタッフボタン一覧 */}
          <div className="d-grid gap-2">
            <StaffButton
              key={staff.id}
              staff={staff}
              onClick={onStaffSelect}
            />
          </div>
        </div>

        {(reservations.length > 0) ? (
          <div>
            {/* 区切り線 */}
            <hr className="my-4" />
            <div className="text-center">
              <h6 className="text-muted fw-bold mb-3">この時間の予約</h6>
            </div>
            <div className="d-grid gap-2">
              {reservations.map((reservation) => (
                <ReservationDetail key={reservation.id} reservation={reservation} />
              ))}
            </div>
          </div>
        ) : null
        }
      </Modal.Body>
    </Modal>
  );
} 