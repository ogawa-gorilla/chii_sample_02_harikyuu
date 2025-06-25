import StaffSelector from '@/app/components/common/StaffSelector'
import { Form } from 'react-bootstrap'

interface SearchSectionProps {
    selectedStaff: string
    onStaffChange: (staffId: string) => void
}

export default function SearchSection({
    selectedStaff,
    onStaffChange,
}: SearchSectionProps) {
    return (
        <div
            className="position-fixed top-10 start-0 w-100 bg-light border-bottom shadow-sm"
            style={{ zIndex: 1000, padding: '1rem 0' }}
        >
            <div className="container">
                <StaffSelector
                    selectedStaff={selectedStaff}
                    onStaffChange={onStaffChange}
                />
                <Form className="mb-0 mt-3">
                    <Form.Control
                        type="text"
                        placeholder="氏名・日付・内容で検索"
                    />
                </Form>
            </div>
        </div>
    )
}
