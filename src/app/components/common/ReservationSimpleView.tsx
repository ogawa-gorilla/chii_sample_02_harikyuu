import { Reservation } from '@/app/types/reservation';

interface ReservationDetailProps {
  reservation: Reservation;
  onDetailClick?: () => void;
  onEditClick?: () => void;
}

export default function ReservationSimpleView({ reservation, onDetailClick, onEditClick }: ReservationDetailProps) {
  return (
    <div className="border-bottom pb-3 mb-3 d-flex">
      {/* 左側半分 - 情報 */}
      <div className="flex-fill pe-3">
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
            <div className="text-muted small">{reservation.staff.role}</div>
          </div>
        </div>
        <div className="ms-5">
          <div><strong>お客様:</strong> {reservation.client}</div>
          <div><strong>時間:</strong> {reservation.time} ({reservation.duration}時間)</div>
        </div>
      </div>
      
      {/* 右側半分 - ボタン */}
      <div className="d-flex flex-column justify-content-center gap-2" style={{ minWidth: '120px' }}>
        <button 
          className="btn btn-outline-primary btn-lg"
          style={{ fontSize: '16px', padding: '8px 16px' }}
          onClick={onDetailClick}
        >
          詳細
        </button>
        <button 
          className="btn btn-primary btn-lg"
          style={{ fontSize: '16px', padding: '8px 16px' }}
          onClick={onEditClick}
        >
          編集
        </button>
      </div>
    </div>
  );
} 