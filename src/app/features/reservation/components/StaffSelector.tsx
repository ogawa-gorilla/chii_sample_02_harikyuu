import { User } from "@/app/types/user";

interface StaffSelectorProps {
  availableStaffs: User[];
  value: string;
  errors: {
    staffId?: string;
  };
  onChange: (value: string) => void;
}

export default function StaffSelector({ availableStaffs, value, errors, onChange }: StaffSelectorProps) {
  return (
    <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              担当スタッフ <span className="text-red-500">*</span>
            </label>
            <select
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className={`w-full border rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            >
              {availableStaffs.map((staff) => (
                <option key={staff.id} value={staff.id}>
                  {staff.name}
                </option>
              ))}
            </select>
            {errors.staffId && (
              <p className="mt-1 text-sm text-red-500">{errors.staffId}</p>
            )}
          </div>
  )
}