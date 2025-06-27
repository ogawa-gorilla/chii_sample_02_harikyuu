import { EditLogTarget } from '@/app/types/EditLog'
import { Form } from 'react-bootstrap'

interface EditLogTypeSelectorProps {
    selectedType: EditLogTarget | null
    onTypeChange: (type: EditLogTarget | null) => void
}

export default function EditLogTypeSelector({
    selectedType,
    onTypeChange,
}: EditLogTypeSelectorProps) {
    const valueString = selectedType ? selectedType : 'all'

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === 'all') {
            onTypeChange(null)
        } else {
            onTypeChange(e.target.value as EditLogTarget)
        }
    }

    return (
        <Form.Select value={valueString} onChange={handleTypeChange}>
            <option value="all">すべて</option>
            <option value={EditLogTarget.RESERVATION}>予約</option>
            <option value={EditLogTarget.SHIFT}>シフト</option>
            <option value={EditLogTarget.TREATMENT_RECORD}>施術記録</option>
        </Form.Select>
    )
}
