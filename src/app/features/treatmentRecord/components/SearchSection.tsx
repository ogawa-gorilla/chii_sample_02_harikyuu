import StaffSelector from '@/app/components/common/StaffSelector'
import { TreatmentRecordSearchConditions } from '@/app/types/treatmentRecord'
import { Form } from 'react-bootstrap'

interface SearchSectionProps {
    conditions: TreatmentRecordSearchConditions
    onConditionsChange: (conditions: TreatmentRecordSearchConditions) => void
}

export default function SearchSection({
    conditions,
    onConditionsChange,
}: SearchSectionProps) {
    return (
        <div
            className="position-fixed top-12 start-0 w-100 bg-light border-bottom shadow-sm"
            style={{ zIndex: 1000, padding: '1rem 0' }}
        >
            <div className="container">
                <StaffSelector
                    selectedStaff={conditions.staffId}
                    onStaffChange={(staffId) =>
                        onConditionsChange({
                            ...conditions,
                            staffId: staffId,
                        })
                    }
                />
                <Form className="mb-0 mt-3">
                    <Form.Control
                        type="text"
                        placeholder="氏名・日付・内容で検索"
                        value={conditions.searchText}
                        onChange={(e) =>
                            onConditionsChange({
                                ...conditions,
                                searchText: e.target.value,
                            })
                        }
                    />
                </Form>
            </div>
        </div>
    )
}
