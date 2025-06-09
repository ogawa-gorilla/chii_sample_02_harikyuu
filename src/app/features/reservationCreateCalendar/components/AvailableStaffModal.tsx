import { Reservation } from '@/app/types/reservation';
import { User } from '@/app/types/user';
import dayjs from 'dayjs';
import { Button, Modal } from 'react-bootstrap';

interface AvailableStaffModalProps {
  show: boolean;
  onHide: () => void;
  date: string;
  hour: number;
  availableStaffs: User[];
  reservations: Reservation[];
  onStaffSelect?: (staffId: string) => void;
  onCreateWithoutStaff?: () => void;
}

export default function AvailableStaffModal({
  show,
  onHide,
  date,
  hour,
  availableStaffs,
  reservations,
}: AvailableStaffModalProps) {
  
  const formatDateTime = () => {
    const dayObj = dayjs(date);
    const dayOfWeek = dayObj.format('dddd');
    const formattedDate = dayObj.format('M月D日');
    const formattedHour = `${hour.toString().padStart(2, '0')}:00`;
    return `${formattedDate}(${dayOfWeek}) ${formattedHour}`;
  };

  return (
    <Modal 
      show={show} 
      onHide={onHide}
      centered
      size="lg"
    >
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="w-100 text-center fs-5 fw-bold">
          {formatDateTime()}
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="pt-2">
        {/* 空いているスタッフのヘッダー */}
        <div className="mb-3">
          <h6 className="text-muted fw-bold mb-3">空いているスタッフ</h6>
          
          {/* スタッフボタン一覧 */}
          <div className="d-grid gap-2">
            {availableStaffs.length > 0 ? (
              availableStaffs.map((staff) => (
                <Button
                  key={staff.id}
                  variant="outline-primary"
                  size="lg"
                  className="py-3"
                  style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    borderColor: staff.themeColor,
                    color: staff.themeColor,
                    minHeight: '60px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = staff.themeColor;
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = staff.themeColor;
                  }}
                >
                  {staff.name}の予約を作成する
                </Button>
              ))
            ) : (
              <div className="text-center py-4 text-muted">
                <em>この時間に空いているスタッフはいません</em>
              </div>
            )}
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
                <div key={reservation.id}>{reservation.staff.name}</div>
              ))}
            </div>
          </div>
        ) : null
        }

        {/* 区切り線 */}
        <hr className="my-4" />

        {/* スタッフ指定なしボタン */}
        <div className="d-grid">
          <Button
            variant="secondary"
            size="lg"
            className="py-3"
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              minHeight: '60px'
            }}
          >
            予約を作成する
          </Button>
          <small className="text-muted text-center mt-2">
            ※スタッフを指定しないで予約を作成します
          </small>
        </div>
      </Modal.Body>
    </Modal>
  );
} 