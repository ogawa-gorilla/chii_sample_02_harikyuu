import { useAppSelector } from '@/app/hooks'
import { getStaffs } from '@/app/store/userSlice'
import { Form } from 'react-bootstrap'

interface StaffSelectorForReservationProps {
    selectedStaff: string
    onStaffChange: (staffId: string) => void
    required?: boolean
    allowAll?: boolean
}

export default function StaffSelector({
    selectedStaff,
    onStaffChange,
    required = true,
    allowAll = true,
}: StaffSelectorForReservationProps) {
    const staffs = useAppSelector(getStaffs)

    return (
        <div className="mb-3">
            <Form.Label className="fw-bold">
                スタッフ {required && <span className="text-danger">*</span>}
            </Form.Label>
            <Form.Select
                value={selectedStaff}
                onChange={(e) => onStaffChange(e.target.value)}
                required={required}
            >
                {allowAll && <option value="all">すべて</option>}
                {staffs.map((staff) => (
                    <option key={staff.id} value={staff.id}>
                        {staff.name}
                    </option>
                ))}
            </Form.Select>
        </div>
    )
}
