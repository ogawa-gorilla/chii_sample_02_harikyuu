import { Form } from 'react-bootstrap'
import { SortKey } from '../hooks/SortFunc'

interface SortMethodSelectorProps {
    sortKey: SortKey
    onChange: (sortKey: SortKey) => void
}

export default function SortMethodSelector({
    sortKey,
    onChange,
}: SortMethodSelectorProps) {
    return (
        <Form.Select
            value={sortKey}
            onChange={(e) => onChange(e.target.value as SortKey)}
        >
            <option value={SortKey.DATE_ASC}>日付(早い順)</option>
            <option value={SortKey.DATE_DESC}>日付(遅い順)</option>
            <option value={SortKey.CLIENT_ASC}>顧客名(あいうえお順)</option>
            <option value={SortKey.CLIENT_DESC}>顧客名(あいうえお逆順)</option>
            <option value={SortKey.STAFF_ASC}>施術者(あいうえお順)</option>
            <option value={SortKey.STAFF_DESC}>
                施術者降順(あいうえお逆順)
            </option>
        </Form.Select>
    )
}
