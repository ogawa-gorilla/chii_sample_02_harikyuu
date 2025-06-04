import { Form } from 'react-bootstrap';

interface StaffSelectorProps {
  selectedStaff: string;
  onStaffChange: (staff: string) => void;
}

const staffOptions = [
  { value: 'all', label: 'すべて' },
  { value: '鈴木', label: '鈴木(店長)' },
  { value: '佐藤', label: '佐藤' },
  { value: '田中', label: '田中' }
];

export default function StaffSelector({ selectedStaff, onStaffChange }: StaffSelectorProps) {
  return (
    <div className="mb-3">
      <div className="mb-2">
        <strong>スタッフを選択</strong>
      </div>
      <div className="d-flex flex-wrap gap-3">
        {staffOptions.map((option) => (
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
          />
        ))}
      </div>
    </div>
  );
} 