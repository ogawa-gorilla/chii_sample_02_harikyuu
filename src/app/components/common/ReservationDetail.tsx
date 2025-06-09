import { Reservation } from '@/app/types/reservation';

interface ReservationDetailProps {
  reservation: Reservation;
}

export default function ReservationDetail({ reservation }: ReservationDetailProps) {
  return (
    <div className="border-bottom pb-3 mb-3">
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
      </div>
    </div>
  );
} 