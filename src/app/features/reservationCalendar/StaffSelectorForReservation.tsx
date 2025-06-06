import { useAppSelector } from '@/app/hooks';
import { Role } from '@/app/types/role';
import { Form } from 'react-bootstrap';

interface StaffSelectorForReservationProps {
  selectedStaff: string;
  onStaffChange: (staffId: string) => void;
  required?: boolean;
}

export default function StaffSelectorForReservation({ 
  selectedStaff, 
  onStaffChange, 
  required = true 
}: StaffSelectorForReservationProps) {
  const staffs = useAppSelector((state) => 
    state.user.users.filter(
      (user) => user.role === Role.STAFF || user.role === Role.MANAGER
    )
  );

  return (
    <div className="mb-3">
      <Form.Label className="fw-bold">
        担当スタッフ {required && <span className="text-danger">*</span>}
      </Form.Label>
      <Form.Select
        value={selectedStaff}
        onChange={(e) => onStaffChange(e.target.value)}
        required={required}
      >
        <option value="none">スタッフを選択してください</option>
        {staffs.map((staff) => (
          <option key={staff.id} value={staff.id}>
            {staff.name}
          </option>
        ))}
      </Form.Select>
    </div>
  );
} 