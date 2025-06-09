import { useAppSelector } from '@/app/hooks';
import { Role } from '@/app/types/role';
import { Form } from 'react-bootstrap';

interface StaffSelectorProps {
  selectedStaff: string;
  onStaffChange: (staff: string) => void;
  labelForNone: string;
}

interface StaffOption {
  value: string;
  label: string;
  themeColor: string;
}

export default function StaffSelector({ selectedStaff, onStaffChange, labelForNone = '(選択してください)' }: StaffSelectorProps) {

  const staffs = useAppSelector((state) => state.user.users.filter(
    (user) => user.role === Role.STAFF || user.role === Role.MANAGER));
  
  const staffOptions: StaffOption[] = [{
    value: 'none',
    label: labelForNone,
    themeColor: '#000000',
  }, ...staffs.map((staff) => ({
    value: staff.id,
    label: staff.name,
    themeColor: staff.themeColor,
  }))];

  return (
    <div className="mb-3">
      <div >
        <strong>スタッフを選択</strong>
      </div>
      <div className="d-flex flex-wrap gap-3 p-1">
        {staffOptions.map((option) => (
          <div className="p-1" style={{ backgroundColor: option.themeColor, color: 'white' }} key={"div_" + option.value}>
          <Form.Check
            key={option.value}
            type="radio"
            id={`staff-${option.value}`}
            name="staff-selection"
            label={option.label}
            value={option.value}
            checked={selectedStaff === option.value}
            onChange={(e) => onStaffChange(e.target.value)}
            className="mb-1"
            style={{ color: 'white' }}
          />
          </div>
        ))}
      </div>
    </div>
  );
} 